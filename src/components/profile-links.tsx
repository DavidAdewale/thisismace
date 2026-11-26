import { Fragment } from "react";
import { profiles } from "@/content/profiles";
import {
  SiApplemusic,
  SiAudiomack,
  SiFacebook,
  SiInstagram,
  SiSpotify,
  SiThreads,
  SiTiktok,
  SiX,
  SiYoutube,
} from "react-icons/si";

export const profileIcons = {
  Spotify: SiSpotify,
  "Apple Music": SiApplemusic,
  Audiomack: SiAudiomack,
  YouTube: SiYoutube,
  Instagram: SiInstagram,
  TikTok: SiTiktok,
  X: SiX,
  Threads: SiThreads,
  Facebook: SiFacebook,
};

export const profileClassNames: Record<string, string> = {
  Spotify: "profile-spotify",
  "Apple Music": "profile-apple-music",
  Audiomack: "profile-audiomack",
  YouTube: "profile-youtube",
  Instagram: "profile-instagram",
  TikTok: "profile-tiktok",
  X: "profile-x",
  Threads: "profile-threads",
  Facebook: "profile-facebook",
};

export function ProfileLinks() {
  return <div className="profiles" id="profiles">
    <nav aria-label="Mace’s music and social profiles">
      {profiles.map((profile, i) => {
        const Icon = profileIcons[profile.label as keyof typeof profileIcons];
        const className = profileClassNames[profile.label];
        // A thin line between the music and social icons so they read as two sets.
        const groupStart = i > 0 && profiles[i - 1].group !== profile.group;
        return <Fragment key={profile.label}>
          {groupStart && <span className="profile-divider" aria-hidden="true" />}
          {profile.url ? (
          <a className={className} href={profile.url} data-track={profile.group === "social" ? "social_click" : "streaming_click"} data-platform={profile.label} data-location="footer" target="_blank" rel="noopener noreferrer" aria-label={`${profile.label} (opens in a new tab)`} title={profile.label}>
            <Icon aria-hidden="true" />
          </a>
        ) : (
          <span className={`profile-pending ${className}`} aria-disabled="true" aria-label={`${profile.label} — link coming soon`} title={`${profile.label} — link coming soon`}>
            <Icon aria-hidden="true" />
          </span>
          )}
        </Fragment>;
      })}
    </nav>
  </div>;
}
