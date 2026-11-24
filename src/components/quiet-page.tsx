import Image from "next/image";
import Link from "next/link";
import { Ambient, RevealHeading } from "@/components/ambient";
import type { Photo } from "@/content/site";

export function QuietPage({ eyebrow, lines, photo }: { eyebrow: string; lines: { text: string; em?: boolean }[]; photo: Photo }) {
  return (
    <section className="quiet-page hero-early">
      <Ambient />
      <div className="quiet-grid">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <RevealHeading lines={lines} />
          <Link className="back-link" href="/">Back to Mace’s world</Link>
        </div>
        <div className="quiet-photo">
          <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 900px) 60vw, 360px" style={{ objectPosition: photo.position }} preload />
        </div>
      </div>
    </section>
  );
}
