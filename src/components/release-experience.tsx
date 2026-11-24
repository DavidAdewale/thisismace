import {
  SiApplemusic,
  SiAudiomack,
  SiSpotify,
  SiYoutube,
} from "react-icons/si";
import { Ambient, RevealHeading } from "@/components/ambient";
import { EmailSignup } from "@/components/email-signup";
import { PortraitRotator, Sleeve } from "@/components/hero-portrait";
import { currentRelease, phasePhotos, type ReleasePhase } from "@/content/site";

const serviceIcons = {
  Spotify: SiSpotify,
  "Apple Music": SiApplemusic,
  Audiomack: SiAudiomack,
  YouTube: SiYoutube,
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span className="eq" aria-hidden="true"><i /><i /><i /><i /></span>
      {children}
    </p>
  );
}

function EarlyState() {
  return (
    <>
      <div className="hero-copy">
        <Eyebrow>You found me early</Eyebrow>
        <RevealHeading lines={[{ text: "Don’t get" }, { text: "too comfy.", em: true }]} />
        <p className="hero-line">I&apos;m only just getting started.</p>
        <EmailSignup source="early" heading="Want the first clue?" buttonLabel="Keep me close" note="No noise. Just the good stuff." />
      </div>
      <PortraitRotator photos={phasePhotos.early} chip="Something’s coming" />
    </>
  );
}

function PresaveState() {
  return (
    <>
      <div className="hero-copy">
        <Eyebrow>The first one · 12 February 2027</Eyebrow>
        <RevealHeading lines={[{ text: "Who Be" }, { text: "Dat Girl?", em: true }]} />
        <p className="hero-line lyric">“{currentRelease.lyric}”</p>
        {currentRelease.presaveUrl ? (
          <a className="primary-action" href={currentRelease.presaveUrl} target="_blank" rel="noopener noreferrer">Pre-save WBDG</a>
        ) : (
          <span className="primary-action action-pending" aria-disabled="true">Pre-save link coming soon</span>
        )}
        <EmailSignup source="presave" heading="Rather hear it from me?" buttonLabel="Tell me when it drops" />
      </div>
      <PortraitRotator photos={phasePhotos.presave} chip="WBDG · 12.02.27" />
    </>
  );
}

function ReleasedState() {
  return (
    <>
      <div className="hero-copy">
        <Eyebrow>Out now</Eyebrow>
        <RevealHeading lines={[{ text: "Who Be" }, { text: "Dat Girl?", em: true }]} />
        <p className="hero-line lyric">“{currentRelease.lyric}”</p>
        <nav className="listen-links" aria-label="Listen to Who Be Dat Girl?">
          {currentRelease.listenLinks.map((service) => {
            const Icon = serviceIcons[service.label as keyof typeof serviceIcons];
            return service.url ? (
              <a key={service.label} href={service.url} target="_blank" rel="noopener noreferrer">
                <Icon aria-hidden="true" /><span>{service.label}</span>
              </a>
            ) : (
              <span key={service.label} className="listen-link-pending" aria-disabled="true">
                <Icon aria-hidden="true" /><span>{service.label}</span>
              </span>
            );
          })}
        </nav>
        <EmailSignup source="released" heading="Stay close." buttonLabel="Let me in" note="There’s more after this." />
      </div>
      <Sleeve artwork={currentRelease.artwork} />
    </>
  );
}

const marqueeWords = ["Mace world", "Who Be Dat Girl?", "Lagos to everywhere", "Good music loading"];

export function ReleaseExperience({ phase }: { phase: ReleasePhase }) {
  return (
    <section className={`hero hero-${phase}`} aria-label={`Mace release site: ${phase} phase`}>
      <Ambient />
      <div className="hero-grid">
        {phase === "early" && <EarlyState />}
        {phase === "presave" && <PresaveState />}
        {phase === "released" && <ReleasedState />}
      </div>
      <div className="marquee" aria-hidden="true">
        <div>{[...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords].map((w, i) => <span key={i}>{w}</span>)}</div>
      </div>
    </section>
  );
}
