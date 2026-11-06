import type { Metadata } from "next";
import { Artwork } from "@/components/artwork";
import { CircleInvitation } from "@/components/circle-invitation";
import { currentRelease } from "@/content/site";

export const metadata: Metadata = { title: "Who Be Dat Girl?", description: "The first chapter. Who Be Dat Girl? by Mace. Coming soon." };
export default function ReleasePage() {
  return <><section className="hero" aria-labelledby="release-title"><div className="hero-copy"><p className="eyebrow">Chapter 01 / {currentRelease.status}</p><h1 id="release-title">{currentRelease.title}</h1><p className="lead">{currentRelease.description}</p><p>The first release is on its way.</p></div><Artwork /></section>
    <section className="lyric" aria-label="A lyric from Who Be Dat Girl?"><p className="eyebrow">From the song</p><blockquote>“{currentRelease.lyric}”</blockquote><p>Mace — Who Be Dat Girl?</p></section><CircleInvitation /></>;
}
