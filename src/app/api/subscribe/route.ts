const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const source = typeof body?.source === "string" ? body.source.slice(0, 40) : "site";
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

  const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      groups: [groupId],
      fields: { ...(name && { name }), signup_source: source, first_era: "wbdg" },
    }),
  });

  if (!response.ok) {
    console.error("[subscribe] MailerLite rejected signup:", response.status, (await response.text()).slice(0, 500));
    return Response.json(
      { message: "That didn’t go through. Try again in a moment." },
      { status: 502 },
    );
  }

  return Response.json({ message: "You’re early. I’ll be in touch." });
}
