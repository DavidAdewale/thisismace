import { campaignAttribution } from "@/content/attribution";

export function socialBioRedirect(source: string) {
  return (request: Request) => {
    const { searchParams } = new URL(request.url);
    const incoming = campaignAttribution((key) => searchParams.get(key));
    const configured = campaignAttribution(() => process.env.SOCIAL_BIO_CAMPAIGN?.trim());
    const destination = new URLSearchParams({
      utm_source: source,
      utm_medium: "organic_social",
      utm_campaign: configured.utm_campaign ?? "artist_warmup",
      utm_content: "bio",
    });

    for (const key of ["utm_id", "utm_term"]) {
      if (incoming[key]) destination.set(key, incoming[key]);
    }
    for (const key of ["fbclid", "ttclid"]) {
      const value = searchParams.get(key);
      if (value && /^[a-z0-9_-]{8,250}$/i.test(value)) destination.set(key, value);
    }

    return new Response(null, {
      status: 307,
      headers: { Location: `/?${destination}`, "Cache-Control": "no-store" },
    });
  };
}
