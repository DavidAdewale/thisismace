import { profiles } from "@/content/profiles";
import { siteOrigin } from "@/content/seo";
import { currentRelease, phasePhotos, site, type ReleasePhase } from "@/content/site";

const artist = { "@id": `${siteOrigin}/#mace` };
const genres = ["Afrobeats", "Afro-Pop", "R&B"];

export function ArtistSchema({ phase }: { phase: ReleasePhase }) {
  const nodes: object[] = [
    {
      "@type": "WebSite",
      "@id": `${siteOrigin}/#website`,
      url: `${siteOrigin}/`,
      name: site.name,
      inLanguage: "en",
      about: artist,
      publisher: artist,
    },
    {
      "@type": "Person",
      ...artist,
      name: site.name,
      url: `${siteOrigin}/`,
      image: new URL(phasePhotos.early.src, siteOrigin).href,
      description: "Mace is a Nigerian singer, songwriter and producer blending Afrobeats, Afro-Pop and R&B.",
      nationality: { "@type": "Country", name: "Nigeria" },
      hasOccupation: ["Singer", "Songwriter", "Music producer"].map((name) => ({ "@type": "Occupation", name })),
      knowsAbout: genres,
      sameAs: profiles.flatMap(({ url }) => url ? [url] : []),
    },
  ];

  if (phase !== "early") {
    const recording = { "@id": `${siteOrigin}/music/${currentRelease.slug}#recording` };
    const release = { "@id": `${siteOrigin}/music/${currentRelease.slug}#release` };
    const album = { "@id": `${siteOrigin}/music/${currentRelease.slug}#single` };
    const artwork = phase === "released" ? new URL(currentRelease.artwork.src, siteOrigin).href : undefined;
    const links = phase === "released"
      ? currentRelease.listenLinks.flatMap(({ url }) => url?.startsWith("https://") ? [url] : [])
      : [];

    nodes.push(
      {
        "@type": "MusicRecording",
        ...recording,
        name: currentRelease.title,
        byArtist: artist,
        inAlbum: album,
        image: artwork,
        ...(links.length ? { sameAs: links } : {}),
      },
      {
        "@type": "MusicAlbum",
        ...album,
        name: currentRelease.title,
        byArtist: artist,
        albumReleaseType: "https://schema.org/SingleRelease",
        albumRelease: release,
      },
      {
        "@type": "MusicRelease",
        ...release,
        name: currentRelease.title,
        releaseOf: album,
        datePublished: currentRelease.releaseDate,
        image: artwork,
      },
    );
  }

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
