// Kept apart from site.ts on purpose: client components import this,
// so it must never sit next to unreleased song details.
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
