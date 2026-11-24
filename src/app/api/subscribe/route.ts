import { campaignAttribution } from "@/content/attribution";
import { resolveReleasePhase } from "@/content/site";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const endpoint = "https://connect.mailerlite.com/api/subscribers";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const phase = resolveReleasePhase();
  const source = body?.source === "circle" ? "circle" : phase;
  // Optional first name, used to personalise emails ({$name} in MailerLite).
  const name = typeof body?.name === "string" ? body.name.replace(/[\u0000-\u001f<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 60) : "";

  // Light bot check: the form reports how long it was open. Real people take more than a second.
  // Rejections are always visible; never fake success, or real fans silently get lost.
  const elapsed = Number(body?.elapsed);
  if (Number.isFinite(elapsed) && elapsed >= 0 && elapsed < 1200) {
    return Response.json({ message: "That was quick. Give it a second and try again." }, { status: 429 });
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return Response.json({ message: "Enter a valid email address." }, { status: 400 });
  }

  const token = process.env.MAILERLITE_API_TOKEN;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!token || !groupId) {
    console.error("[subscribe] MailerLite keys missing: set MAILERLITE_API_TOKEN and MAILERLITE_GROUP_ID in .env.local");
    return Response.json(
      { message: "The list isn’t open yet. Come back soon." },
      { status: 503 },
    );
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const attribution = campaignAttribution((key) => body?.attribution?.[key]);
  const configuredFields = new Set(process.env.MAILERLITE_ATTRIBUTION_FIELDS?.split(",").map((key) => key.trim()));
  const acquisition = { ...attribution, signup_source: source, campaign_phase: phase, first_era: "wbdg" };
  const fields = {
    ...(name && { name }),
    ...Object.fromEntries(Object.entries(acquisition).filter(([key]) => configuredFields.has(key))),
  };
  try {
    const existing = await fetch(`${endpoint}/${encodeURIComponent(email)}`, {
      headers, cache: "no-store", signal: AbortSignal.timeout(8000),
    });
    if (existing.ok) {
      const { data } = await existing.json();
      if (data?.status !== "active" || data.groups?.some((group: { id: string }) => group.id === groupId)) {
        return Response.json({ created: false });
      }
    } else if (existing.status !== 404) {
      throw new Error(`Subscriber lookup returned ${existing.status}`);
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({ email, groups: [groupId], ...(existing.status === 404 && { fields }) }),
    });
    if (!response.ok) throw new Error(`Subscriber upsert returned ${response.status}`);
    return Response.json({ created: response.status === 201 });
  } catch (error) {
    console.error("[subscribe] MailerLite request failed:", error instanceof Error ? error.name : "unknown");
    return Response.json(
      { message: "That didn’t go through. Try again in a moment." },
      { status: 502 },
    );
  }
}
