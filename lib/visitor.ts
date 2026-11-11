import { useSyncExternalStore } from "react";

/**
 * Consent-gated anonymous visitor id (client-side only).
 *
 * DPDP Act 2023: nothing is stored or sent until the visitor clearly says yes.
 * Until then there is no id, no tracking beacon. Declining/withdrawing wipes the
 * id and asks the server to delete the browsing trail linked to it.
 */
const VID = "ctc_vid";
const SEEN = "ctc_seen";
const CONSENT = "ctc_consent";
const EVENT = "ctc-consent";

export type Consent = "granted" | "denied" | null; // null = not asked yet

export function getConsent(): Consent {
  try {
    const v = localStorage.getItem(CONSENT);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: "granted" | "denied") {
  let oldId: string | null = null;
  try {
    localStorage.setItem(CONSENT, value);
    if (value === "denied") {
      oldId = localStorage.getItem(VID);
      localStorage.removeItem(VID);
      localStorage.removeItem(SEEN);
    }
  } catch {}
  // Withdrawal = erasure of what we hold against that id (best effort).
  if (oldId) {
    fetch("/api/track", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vid: oldId }),
      keepalive: true,
    }).catch(() => {});
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Returns "" unless the visitor has consented - callers must treat "" as "no id". */
export function getVisitorId(): string {
  if (getConsent() !== "granted") return "";
  try {
    let id = localStorage.getItem(VID);
    if (!id) {
      id = crypto.randomUUID().replace(/-/g, "").slice(0, 20);
      localStorage.setItem(VID, id);
    }
    return id;
  } catch {
    return "";
  }
}

/** True the first time a consenting browser is seen (for the "new visitor" stat). */
export function markSeen(): boolean {
  try {
    const first = !localStorage.getItem(SEEN);
    localStorage.setItem(SEEN, "1");
    return first;
  } catch {
    return false;
  }
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

/** Live consent state. Server snapshot is `undefined` = "not known yet" (avoids hydration flash). */
export function useConsent(): Consent | undefined {
  return useSyncExternalStore<Consent | undefined>(subscribe, getConsent, () => undefined);
}
