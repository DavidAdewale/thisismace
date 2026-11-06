import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "The Listening Circle", description: "A little closer to Mace’s music and process." };
export default function CirclePage() {
  return <section className="circle-page" aria-labelledby="circle-heading"><p className="eyebrow">Mace’s Listening Circle</p><h1 id="circle-heading">{site.circle.title}</h1><p className="lead">{site.circle.description}</p><p>Two thoughtful notes a month. And when you reply, it’s me on the other side.</p>
    <div className="signup-pending"><p className="eyebrow">Opening soon</p><p>The Circle isn’t open for signups just yet. There’s more to come.</p></div>
    <Link className="text-link" href="/music/wbdg">Explore the first chapter <span aria-hidden="true">↗</span></Link>
  </section>;
}
