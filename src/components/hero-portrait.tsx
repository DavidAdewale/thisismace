"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Photo } from "@/content/site";


function usePointerParallax() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--px", ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3));
        el.style.setProperty("--py", ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(frame); };
  }, []);
  return ref;
}

function Badge({ label }: { label: string }) {
  return (
    <div className="badge" aria-hidden="true">
      <svg viewBox="0 0 120 120">
        <defs><path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
        <text><textPath href="#badge-circle">{label}</textPath></text>
      </svg>
      <svg className="badge-heart" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.8 4.5c2.1 0 3.6 1.2 4.4 2.5.8-1.3 2.3-2.5 4.4-2.5 3.8 0 5.9 3.9 4.4 7.3C19.5 16.4 12 21 12 21z" />
      </svg>
    </div>
  );
}

// One photo for now: unreleased shots stay private until they're dropped.
export function Portrait({ photo, chip, badge }: { photo: Photo; chip: string; badge: string }) {
  const ref = usePointerParallax();
  return (
    <div className="portrait-stage" ref={ref}>
      <div className="portrait-glow" aria-hidden="true" />
      <div className="portrait">
        <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 900px) 78vw, 480px" preload className="is-active" style={{ objectPosition: photo.position }} />
      </div>
      <Badge label={badge} />
      <p className="chip">{chip}</p>
    </div>
  );
}

export function Sleeve({ artwork, badge }: { artwork: Photo; badge: string }) {
  const ref = usePointerParallax();
  return (
    <div className="portrait-stage" ref={ref}>
      <div className="portrait-glow" aria-hidden="true" />
      <div className="sleeve-wrap">
        <div className="vinyl" aria-hidden="true" />
        <div className="sleeve">
          <Image src={artwork.src} alt={artwork.alt} fill sizes="(max-width: 900px) 72vw, 420px" preload />
        </div>
      </div>
      <Badge label={badge} />
    </div>
  );
}
