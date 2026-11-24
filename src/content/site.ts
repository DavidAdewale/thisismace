export const site = {
  name: "Mace",
  description: "The beginning of Mace.",
};

export type ReleasePhase = "early" | "presave" | "released";

export const releaseSchedule = {
  presaveStarts: "2027-01-15T00:00:00+01:00",
  releases: "2027-02-12T00:00:00+01:00",
};

export function resolveReleasePhase(requested?: string): ReleasePhase {
  const valid = (value?: string): value is ReleasePhase => value === "early" || value === "presave" || value === "released";
  if (valid(process.env.SITE_PHASE_OVERRIDE)) return process.env.SITE_PHASE_OVERRIDE;
  if (process.env.NODE_ENV === "development" && valid(requested)) return requested;

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
    { label: "Spotify", url: null },
    { label: "Apple Music", url: null },
    { label: "Audiomack", url: null },
    { label: "YouTube", url: null },
  ],
};

export type Photo = { src: string; alt: string; position?: string };

// Portrait rotation per release phase. First image is the one that loads first.
export const phasePhotos: Record<"early" | "presave", Photo[]> = {
  early: [
    { src: "/images/mace-suit-peek.jpg", alt: "Mace in a dark suit, peeking through ringed fingers against deep blue", position: "50% 30%" },
    { src: "/images/mace-suit-flowers.jpg", alt: "Mace seated in a dark suit holding a bouquet of red and white flowers", position: "40% 18%" },
    { src: "/images/mace-suit-lounge.jpg", alt: "Mace leaning back in a chair, legs crossed, against a blue backdrop", position: "38% 40%" },
    { src: "/images/mace-suit-wide.jpg", alt: "Mace reclining in a chair with flowers resting by his hand", position: "40% 50%" },
  ],
  presave: [
    { src: "/images/mace-red-portrait.jpg", alt: "Mace in a red leather jacket and silver sunglasses against a red backdrop", position: "50% 16%" },
    { src: "/images/mace-red-arms.jpg", alt: "Mace with arms crossed in a red leather jacket, lit by a warm halo", position: "50% 30%" },
    { src: "/images/mace-red.jpg", alt: "Mace in a red leather jacket, turned away, against a glowing red backdrop", position: "55% 20%" },
    { src: "/images/mace-red-point.jpg", alt: "Mace looking back over his shoulder, touching his sunglasses", position: "50% 25%" },
  ],
};

export const quietPhotos = {
  circle: { src: "/images/mace-teal-hands.jpg", alt: "Mace in a blue denim jacket, hands pressed together against a teal wall", position: "55% 25%" },
  notFound: { src: "/images/mace-red-point.jpg", alt: "Mace looking back over his shoulder, touching his sunglasses", position: "50% 25%" },
} satisfies Record<string, Photo>;

// Only verified artist URLs belong here. Null entries are inactive preview labels.
export const profiles: { label: string; group: "music" | "social"; url: string | null }[] = [
  { label: "Spotify", group: "music", url: "https://open.spotify.com/artist/76tuN7zcCjhDOuzM0U7v6E" },
  { label: "Apple Music", group: "music", url: "https://music.apple.com/us/artist/mace/1475786949" },
  { label: "Audiomack", group: "music", url: "https://audiomack.com/realmace" },
  { label: "YouTube", group: "music", url: "https://www.youtube.com/@macepapi" },
  { label: "Instagram", group: "social", url: "https://www.instagram.com/real.mace/" },
  { label: "TikTok", group: "social", url: "https://www.tiktok.com/@real.mace" },
  { label: "X", group: "social", url: "https://x.com/realmace_" },
];
