"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { signupAttribution, trackSignup } from "@/components/tracking";

type Status = "idle" | "submitting" | "success" | "error";


function HeartBurst() {
  return (
    <div className="signup-burst" aria-hidden="true">
      {Array.from({ length: 7 }, (_, i) => (
        <svg key={i} className="burst-heart" style={{ "--i": i } as React.CSSProperties} viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.8 4.5c2.1 0 3.6 1.2 4.4 2.5.8-1.3 2.3-2.5 4.4-2.5 3.8 0 5.9 3.9 4.4 7.3C19.5 16.4 12 21 12 21z" />
        </svg>
      ))}
      <span className="burst-core">
        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.8 4.5c2.1 0 3.6 1.2 4.4 2.5.8-1.3 2.3-2.5 4.4-2.5 3.8 0 5.9 3.9 4.4 7.3C19.5 16.4 12 21 12 21z" /></svg>
      </span>
    </div>
  );
}

export function EmailSignup({
  source,
  heading,
  buttonLabel,
  note,
}: {
  source: string;
  heading: string;
  buttonLabel: string;
  note?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isNew, setIsNew] = useState(false);
  const submitting = useRef(false);
  const openedAt = useRef(0);
  useEffect(() => { openedAt.current = Date.now(); }, []);

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim().split(/\s+/)[0] ?? "";

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          source,
          attribution: signupAttribution(),
          elapsed: openedAt.current ? Date.now() - openedAt.current : undefined,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setIsNew(result.created === true);
        if (result.created === true) trackSignup(source === "circle" ? "circle" : "release_hero");
        setFirstName(name);
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setMessage(result.message);
      }
    } catch {
      setStatus("error");
      setMessage("That didn’t go through. Try again in a moment.");
    } finally {
      submitting.current = false;
    }
  }

  if (status === "success") {
    return (
      <div className="signup signup-done" id="email" role="status" aria-live="polite">
        <HeartBurst />
        <p className="signup-heading">{firstName ? <>You’re in, <span>{firstName}</span>.</> : <>You’re in.</>}</p>
        <p className="signup-note">{isNew ? "Check your inbox for a note from me." : "Thanks for being here."}</p>
      </div>
    );
  }

  return (
    <div className="signup" id="email">
      <div>
        <p className="signup-heading">{heading}</p>
        {note && <p className="signup-note">{note}</p>}
      </div>
      <form onSubmit={subscribe}>
        <label className="sr-only" htmlFor={`name-${source}`}>First name (optional)</label>
        <input id={`name-${source}`} className="signup-name" name="name" type="text" autoComplete="given-name" placeholder="First name" maxLength={60} />
        <span className="signup-divider" aria-hidden="true" />
        <label className="sr-only" htmlFor={`email-${source}`}>Email address</label>
        <input id={`email-${source}`} name="email" type="email" autoComplete="email" placeholder="Your email" required />
        <button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "One second…" : buttonLabel}
        </button>
      </form>
      <p className="consent">Occasional emails from Mace. Unsubscribe anytime. <a href="/privacy">Privacy</a></p>
      <p className={`form-message form-${status}`} aria-live="polite">{message}</p>
    </div>
  );
}
