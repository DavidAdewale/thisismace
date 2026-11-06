import Image from "next/image";
import { currentRelease } from "@/content/site";

export function Artwork() {
  const artwork = currentRelease.artwork;
  return (
    <div className="artwork">
      {artwork ? <Image src={artwork.src} alt={artwork.alt} fill sizes="(max-width: 760px) 100vw, 50vw" priority /> : (
        <div className="artwork-placeholder" role="img" aria-label="Space reserved for Mace’s forthcoming photography">
          <span className="eyebrow">Mace / Chapter 01</span>
          <span className="artwork-monogram" aria-hidden="true">M.</span>
          <span className="eyebrow">Photography to come</span>
        </div>
      )}
    </div>
  );
}
