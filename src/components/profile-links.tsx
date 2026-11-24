import { profiles } from "@/content/profiles";
import {
  SiApplemusic,
  SiAudiomack,
  SiInstagram,
  SiSpotify,
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
};

export const profileClassNames: Record<string, string> = {
  Spotify: "profile-spotify",
  "Apple Music": "profile-apple-music",
  Audiomack: "profile-audiomack",
  YouTube: "profile-youtube",
  Instagram: "profile-instagram",
  TikTok: "profile-tiktok",
  X: "profile-x",
};

export function ProfileLinks() {
  return <div className="profiles" id="profiles">
    <nav aria-label="Mace’s music and social profiles">
      {profiles.map(profile => {
        const Icon = profileIcons[profile.label as keyof typeof profileIcons];
        return profile.url ? (
          <a className={profileClassNames[profile.label]} key={profile.label} href={profile.url} target="_blank" rel="noopener noreferrer" aria-label={`${profile.label} (opens in a new tab)`} title={profile.label}>
            <Icon aria-hidden="true" />
          </a>
        ) : (
          <span key={profile.label} className={`profile-pending ${profileClassNames[profile.label]}`} aria-disabled="true" aria-label={`${profile.label} — link coming soon`} title={`${profile.label} — link coming soon`}>
            <Icon aria-hidden="true" />
          </span>
        );
      })}
    </nav>
  </div>;
}
