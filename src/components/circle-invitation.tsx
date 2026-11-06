import Link from "next/link";
import { site } from "@/content/site";

export function CircleInvitation() {
  return <section className="invitation" aria-labelledby="circle-title">
    <div><p className="eyebrow">The Listening Circle</p><h2 id="circle-title">{site.circle.title}</h2></div>
    <div><p>{site.circle.description}</p><Link className="text-link" href="/circle">Come closer <span aria-hidden="true">↗</span></Link></div>
  </section>;
}
