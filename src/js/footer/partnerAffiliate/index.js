import { getCookieByKey, setCookie, deleteCookie } from "../cookies";

export function setReferToken() {
  const urlObject = new URL(window.location.href);
  const params = new URLSearchParams(urlObject.search);
  const referrer = params.get("referrer");
  const token = params.get("t");
  if (referrer != null && token != null) {
    const referrer_token = getCookieByKey(document.cookie, "referrer_token");
    if (referrer_token !== token) {
      deleteCookie("referrer_token");
      setCookie("referrer_token", token, 365);
    }
  }
}
