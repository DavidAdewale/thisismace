export const site = {
  name: "Mace",
  description: "Music, stories, and the beginning of Mace’s world.",
  circle: { title: "You’re early.", description: "Music as it takes shape. Occasional notes from me. A little closer to the process." },
};

// Keep each era’s content separate from the permanent site shell.
export const currentRelease = {
  slug: "wbdg",
  title: "Who Be Dat Girl?",
  status: "Coming soon",
  lyric: "It’s like she belongs in my memories.",
  description: "That first moment. Someone you’ve just met, who somehow already feels familiar.",
  artwork: null as { src: string; alt: string } | null,
};
