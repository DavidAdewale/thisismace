"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { campaignAttribution } from "@/content/attribution";

type Choice = { analytics: boolean; advertising: boolean };
type EventName = "page_view" | "sign_up" | "social_click" | "presave_click" | "streaming_click";
type Command = (...args: unknown[]) => void;
type Meta = Command & { queue: unknown[][]; callMethod?: Command; loaded: boolean; version: string; push: Command };
type TikTok = unknown[][] & { _i: Record<string, unknown[]>; _t: Record<string, number>; _o: Record<string, object> };
const ga = /^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? "") ? process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID : undefined;
const meta = /^\d+$/.test(process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "") ? process.env.NEXT_PUBLIC_META_PIXEL_ID : undefined;
const tiktok = /^[A-Z0-9]+$/i.test(process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? "") ? process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID : undefined;
const choiceKey = "mace-cookie-choice-v1";
const attributionKey = "mace-campaign-v1";
const productionHosts = (process.env.NEXT_PUBLIC_TRACKING_HOSTS || "thisismace.com,www.thisismace.com").split(",").map((host) => host.trim());
let choice: Choice | null = null;
let attribution: Record<string, string> = {};
let pageKey = "";
const viewed = new Set<string>();
let google: Command | undefined;
let facebook: Meta | undefined;
let tik: TikTok | undefined;

function enabled() {
  return process.env.NEXT_PUBLIC_ENABLE_LOCAL_TRACKING === "true" ||
    (process.env.NODE_ENV === "production" && productionHosts.includes(location.hostname));
}

function readStorage(storage: Storage, key: string) {
  try { return JSON.parse(storage.getItem(key) ?? "null"); } catch { return null; }
}

function script(src: string) {
  const tag = document.createElement("script");
  tag.async = true;
  tag.referrerPolicy = "no-referrer";
  tag.src = src;
  document.head.append(tag);
}

function initGoogle(id: string) {
  const win = window as Window & { dataLayer?: unknown[]; gtag?: Command };
  const layer = win.dataLayer ??= [];
  google = win.gtag = function () {
    // Mirror the Google tag bootstrap's Arguments entries.
    // eslint-disable-next-line prefer-rest-params
    layer.push(arguments);
  };
  google("js", new Date());
  google("config", id, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: location.origin + location.pathname,
    page_referrer: "",
  });
  script("https://www.googletagmanager.com/gtag/js?id=" + id);
}

function initMeta(id: string) {
  const win = window as Window & { fbq?: Meta; _fbq?: Meta };
  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  }) as Meta;
  fbq.queue = [];
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  facebook = win.fbq = win._fbq = fbq;
  fbq("set", "autoConfig", false, id);
  fbq("init", id);
  script("https://connect.facebook.net/en_US/fbevents.js");
}

function initTikTok(id: string) {
  const win = window as Window & { TiktokAnalyticsObject?: string; ttq?: TikTok };
  const queue = [] as unknown as TikTok;
  const url = "https://analytics.tiktok.com/i18n/pixel/events.js";
  const instance: unknown[] & { _u?: string } = [];
  instance._u = url;
  queue._i = { [id]: instance };
  queue._t = { [id]: Date.now() };
  queue._o = { [id]: {} };
  const methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"];
  const defer = (target: unknown[][] | unknown[]) => {
    for (const method of methods) Object.assign(target, { [method]: (...args: unknown[]) => target.push([method, ...args]) });
  };
  Object.assign(queue, { methods, setAndDefer: (target: unknown[], method: string) => {
    Object.assign(target, { [method]: (...args: unknown[]) => target.push([method, ...args]) });
  }, instance: () => instance });
  defer(queue);
  defer(instance);
  win.TiktokAnalyticsObject = "ttq";
  tik = win.ttq = queue;
  script(url + "?sdkid=" + id + "&lib=ttq");
}

function tikCommand(method: string, ...args: unknown[]) {
  (tik as unknown as Record<string, Command> | undefined)?.[method]?.(...args);
}

function phase() {
  return document.querySelector<HTMLElement>("[data-campaign-phase]")?.dataset.campaignPhase ??
    document.body.dataset.phase ?? "early";
}

function pixelSafeUrl() {
  return !location.hash && [...new URLSearchParams(location.search)].every(
    ([key, value]) => (key === "fbclid" || key === "ttclid") && /^[\w-]{8,250}$/.test(value),
  );
}

export function signupAttribution() {
  const params = new URLSearchParams(window.location.search);
  const incoming = campaignAttribution((key) => params.get(key));
  return Object.keys(incoming).length ? incoming : attribution;
}

function emit(name: EventName, extra: Record<string, string> = {}) {
  if (!choice || !enabled()) return;
  const pageLocation = location.origin + location.pathname;
  const tags = signupAttribution();
  const data = { ...tags, campaign_phase: phase(), ...extra };
  if (choice.analytics && ga && google && (name !== "page_view" || !viewed.has("ga"))) {
    const campaign = {
      campaign_id: tags.utm_id, campaign_source: tags.utm_source, campaign_medium: tags.utm_medium,
      campaign_name: tags.utm_campaign, campaign_content: tags.utm_content, campaign_term: tags.utm_term,
    };
    google("event", name, { ...data, ...campaign, send_to: ga, page_location: pageLocation, page_referrer: "" });
    if (name === "page_view") viewed.add("ga");
  }
  // Pixel SDKs can read the current URL themselves. Skip URLs carrying arbitrary values.
  if (!choice.advertising || !pixelSafeUrl()) return;
  const standard = name === "page_view" ? "PageView" : name === "sign_up" ? "Lead" : null;
  if (facebook && meta && (name !== "page_view" || !viewed.has("meta"))) {
    facebook(standard ? "trackSingle" : "trackSingleCustom", meta, standard ?? name, data);
    if (name === "page_view") viewed.add("meta");
  }
  if (tik && (name !== "page_view" || !viewed.has("tiktok"))) {
    if (name === "page_view") {
      tikCommand("page", data);
      viewed.add("tiktok");
    } else tikCommand("track", name === "sign_up" ? "CompleteRegistration" : name, data);
  }
}

export function trackSignup(location: string) {
  try {
    emit("sign_up", { method: "email", button_location: location });
  } catch {
    // An unavailable vendor must not change the signup result.
  }
}

function sync() {
  const params = new URLSearchParams(location.search);
  const incoming = campaignAttribution((key) => params.get(key));
  if (Object.keys(incoming).length) attribution = incoming;
  if (choice?.analytics || choice?.advertising) {
    try {
      if (!Object.keys(attribution).length) {
        const saved = readStorage(sessionStorage, attributionKey);
        attribution = campaignAttribution((key) => saved?.[key]);
      }
      sessionStorage.setItem(attributionKey, JSON.stringify(attribution));
    } catch { /* Storage may be blocked. */ }
  }
  if (!enabled()) return;
  if (choice?.analytics && ga && !google) initGoogle(ga);
  const entries = [...params.entries()];
  if (choice?.advertising && (meta || tiktok) && Object.keys(incoming).length) {
    // Preserve ad click IDs while removing campaign labels from automatic URL collection.
    for (const [key, value] of entries) {
      if (incoming[key] === value) params.delete(key, value);
    }
    const query = params.toString();
    history.replaceState(history.state, "", location.pathname + (query ? "?" + query : "") + location.hash);
  }
  if (choice?.advertising && pixelSafeUrl()) {
    if (meta && !facebook) initMeta(meta);
    if (tiktok && !tik) initTikTok(tiktok);
  }
  const key = location.pathname + ":" + phase();
  if (key !== pageKey) {
    pageKey = key;
    viewed.clear();
  }
  emit("page_view");
}

export function Tracking() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function click(event: MouseEvent) {
      if (event.type === "auxclick" && event.button !== 1) return;
      const link = (event.target as Element | null)?.closest?.<HTMLAnchorElement>("a[data-track]");
      const type = link?.dataset.track;
      if (link && (type === "social_click" || type === "streaming_click" || type === "presave_click")) {
        emit(type, { platform: link.dataset.platform ?? "", button_location: link.dataset.location ?? "" });
      }
    }
    document.addEventListener("click", click);
    document.addEventListener("auxclick", click);
    return () => {
      document.removeEventListener("click", click);
      document.removeEventListener("auxclick", click);
    };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const active = enabled() && Boolean(ga || meta || tiktok);
      setVisible(active);
      try {
        const saved = readStorage(localStorage, choiceKey);
        if (!choice && saved && typeof saved.analytics === "boolean" && typeof saved.advertising === "boolean") choice = saved;
      } catch { /* Use in-memory consent. */ }
      setAnalytics(choice?.analytics ?? false);
      setAdvertising(choice?.advertising ?? false);
      if (active && !choice) setOpen(true);
      sync();
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  function save(next: Choice) {
    const revokeAnalytics = choice?.analytics && !next.analytics;
    const revokeAds = choice?.advertising && !next.advertising;
    choice = next;
    setAnalytics(next.analytics);
    setAdvertising(next.advertising);
    setOpen(false);
    if (revokeAnalytics && ga) Reflect.set(window, "ga-disable-" + ga, true);
    if (revokeAds) {
      facebook?.("consent", "revoke");
      tikCommand("revokeConsent");
      tikCommand("disableCookie");
    }
    if (revokeAnalytics || revokeAds) {
      for (const cookie of document.cookie.split(";")) {
        const name = cookie.split("=")[0].trim();
        const remove = (revokeAnalytics && /^_ga(?:_|$)/.test(name)) ||
          (revokeAds && /^(_fbp|_fbc|_ttp|_tt_enable_cookie|ttcsid(?:_|$))/.test(name));
        if (!remove) continue;
        document.cookie = name + "=; Max-Age=0; Path=/";
        if (location.hostname.endsWith("thisismace.com")) document.cookie = name + "=; Max-Age=0; Path=/; Domain=thisismace.com";
      }
    }
    try {
      localStorage.setItem(choiceKey, JSON.stringify(next));
      if (!next.analytics && !next.advertising) sessionStorage.removeItem(attributionKey);
      if (revokeAnalytics || revokeAds) {
        location.reload();
        return;
      }
    } catch { /* Vendor opt-outs above still apply. */ }
    sync();
  }

  return (
    <div className="site-privacy">
      <a href="/privacy">Privacy</a>
      {visible && <button type="button" aria-expanded={open} onClick={() => setOpen(!open)}>Cookie settings</button>}
      {visible && open && (
        <section className="cookie-panel" aria-label="Cookie preferences">
          <p>Choose whether to allow analytics and advertising cookies. You can change this anytime.</p>
          {ga && <label><input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} /> Analytics (Google)</label>}
          {(meta || tiktok) && <label><input type="checkbox" checked={advertising} onChange={(e) => setAdvertising(e.target.checked)} /> Advertising ({[meta && "Meta", tiktok && "TikTok"].filter(Boolean).join(" and ")})</label>}
          <div>
            <button type="button" onClick={() => save({ analytics: false, advertising: false })}>Reject optional</button>
            <button type="button" onClick={() => save({ analytics, advertising })}>Save choices</button>
          </div>
        </section>
      )}
    </div>
  );
}
