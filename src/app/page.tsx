import Link from "next/link";
import { Artwork } from "@/components/artwork";
import { CircleInvitation } from "@/components/circle-invitation";
import { currentRelease } from "@/content/site";

export default function Home() {
  return <>
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy"><p className="eyebrow">Mace / The first chapter</p>
        <h1 id="hero-title">{currentRelease.title}</h1><p className="lead">{currentRelease.description}</p>
        <p className="release-status"><span aria-hidden="true" />{currentRelease.status}</p>
        <Link className="button" href="/music/wbdg">Step inside <span aria-hidden="true">↗</span></Link>
      </div><Artwork />
    </section>
    <section className="introduction" aria-labelledby="intro-title"><p className="eyebrow">Meet Mace</p><div><h2 id="intro-title">A little of my world.</h2><p>I’m Mace. A Nigerian singer, songwriter and producer. This is where the music, and the stories around it, will live.</p></div></section>
    <CircleInvitation />
  </>;
}
