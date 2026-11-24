"use client";

import { useRef } from "react";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import { profiles } from "@/content/profiles";
import { profileClassNames, profileIcons } from "@/components/profile-links";

const groups = [
  { key: "music", title: "Listen" },
  { key: "social", title: "Follow" },
] as const;

const handles: Record<string, string> = {
  Audiomack: "@realmace",
  YouTube: "@macepapi",
  Instagram: "@real.mace",
  TikTok: "@real.mace",
  X: "@realmace_",
};

export function ProfileDialog() {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button type="button" className="profile-jump" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>
        Find me online
      </button>
      <dialog
        ref={dialog}
        className="profile-dialog"
        aria-labelledby="profile-dialog-title"
        onClick={(e) => { if (e.target === e.currentTarget) dialog.current?.close(); }}
      >
        <div className="profile-dialog-panel">
          <div className="profile-dialog-head">
            <div>
              <p className="profile-dialog-kicker">Where to find</p>
              <h2 id="profile-dialog-title">Mace</h2>
            </div>
            <button type="button" className="profile-dialog-close" aria-label="Close" onClick={() => dialog.current?.close()}>
              <FiX aria-hidden="true" />
            </button>
          </div>
          {groups.map((group) => (
            <section key={group.key} className="profile-dialog-group" aria-label={group.title}>
              <p className="profile-dialog-label">{group.title}</p>
              <ul>
                {profiles.filter((p) => p.group === group.key && p.url).map((profile, i) => {
                  const Icon = profileIcons[profile.label as keyof typeof profileIcons];
                  return (
                    <li key={profile.label} style={{ "--i": i } as React.CSSProperties}>
                      <a className={profileClassNames[profile.label]} href={profile.url!} data-track={profile.group === "social" ? "social_click" : "streaming_click"} data-platform={profile.label} data-location="profile_dialog" target="_blank" rel="noopener noreferrer">
                        <span className="profile-dialog-icon"><Icon aria-hidden="true" /></span>
                        <span className="profile-dialog-name">{profile.label}{handles[profile.label] && <small>{handles[profile.label]}</small>}</span>
                        <FiArrowUpRight className="profile-dialog-arrow" aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </dialog>
    </>
  );
}
