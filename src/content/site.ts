export const site = {
  name: "Mace",
  description: "The beginning of Mace.",
};

export type ReleasePhase = "early" | "presave" | "released";

export const releaseSchedule = {
  presaveStarts: "2027-01-15T00:00:00+01:00",
  releases: "2027-02-12T00:00:00+01:00",
};

// Visitors can't choose a phase. It follows the schedule; only SITE_PHASE_OVERRIDE
// (set on the server, e.g. in .env.local for local testing) can force one.
export function resolveReleasePhase(): ReleasePhase {
  const valid = (value?: string): value is ReleasePhase => value === "early" || value === "presave" || value === "released";
  if (valid(process.env.SITE_PHASE_OVERRIDE)) return process.env.SITE_PHASE_OVERRIDE;

  const now = Date.now();
  if (now >= new Date(releaseSchedule.releases).getTime()) return "released";
  if (now >= new Date(releaseSchedule.presaveStarts).getTime()) return "presave";
  return "early";
}

export const currentRelease = {
  slug: "wbdg",
  title: "Who Be Dat Girl?",
  lyric: "I think she belongs in my memories.",
  artwork: { src: "/images/wbdg-cover.jpg", alt: "Who Be Dat Girl? cover art: Mace in blue sunglasses, hand raised to his face" },
  presaveUrl: process.env.NEXT_PUBLIC_DITTO_PRESAVE_URL ?? null,
  listenLinks: [
    { label: "Spotify", url: process.env.RELEASE_SPOTIFY_URL || null },
    { label: "Apple Music", url: process.env.RELEASE_APPLE_MUSIC_URL || null },
    { label: "Audiomack", url: process.env.RELEASE_AUDIOMACK_URL || null },
    { label: "YouTube", url: process.env.RELEASE_YOUTUBE_URL || null },
  ],
};

export type Photo = { src: string; alt: string; position?: string };

// One hero photo per phase. Only add photos here once they've been released publicly.
export const phasePhotos: Record<"early" | "presave", Photo> = {
  early: { src: "/images/mace-suit-lounge.jpg", alt: "Mace leaning back in a chair, legs crossed, against a blue backdrop", position: "38% 40%" },
  presave: { src: "/images/mace-suit-lounge.jpg", alt: "Mace leaning back in a chair, legs crossed, against a blue backdrop", position: "38% 40%" },
};

export const quietPhotos = {
  circle: { src: "/images/mace-suit-lounge.jpg", alt: "Mace leaning back in a chair, legs crossed, against a blue backdrop", position: "38% 40%" },
  notFound: { src: "/images/mace-suit-lounge.jpg", alt: "Mace leaning back in a chair, legs crossed, against a blue backdrop", position: "38% 40%" },
} satisfies Record<string, Photo>;
