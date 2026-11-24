"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/content/site";

const ROTATE_MS = 5500;

function usePointerParallax() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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

export function PortraitRotator({ photos, chip }: { photos: Photo[]; chip: string }) {
  const ref = usePointerParallax();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || photos.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((n) => (n + 1) % photos.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, photos.length]);

  return (
    <div className="portrait-stage" ref={ref} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div className="portrait-glow" aria-hidden="true" />
      <div className="portrait">
        {photos.map((photo, i) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={i === active ? photo.alt : ""}
            aria-hidden={i !== active}
            fill
            sizes="(max-width: 900px) 78vw, 480px"
            preload={i === 0}
            className={i === active ? "is-active" : undefined}
            style={{ objectPosition: photo.position }}
          />
        ))}
      </div>
      {photos.length > 1 && (
        <div className="portrait-dots" role="group" aria-label="Choose photo">
          {photos.map((photo, i) => (
            <button key={photo.src} type="button" aria-label={`Show photo ${i + 1} of ${photos.length}`} aria-pressed={i === active} onClick={() => setActive(i)} />
          ))}
        </div>
      )}
      <Badge label="Mace world • Lagos to everywhere • " />
      <p className="chip">{chip}</p>
    </div>
  );
}

export function Sleeve({ artwork }: { artwork: Photo }) {
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
      <Badge label="Out now • Who Be Dat Girl? • " />
    </div>
  );
}
