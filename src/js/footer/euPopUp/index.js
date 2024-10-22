import { getCookieByKey, setCookie, getCookie } from "../cookies";

const modal = document.querySelector(".redirection_background-wrapper");
const cancelRedirect = document.getElementById("cancel-redirect");
const proceedRedirect = document.getElementById("proceed-redirect");
const trackingStatusCookie = "tracking_status";
const trackingStatusDeclineCookie = "tracking_status_decline";
const hasDataLayer = window.dataLayer;
const clientInformation = getCookieByKey(document.cookie, "client_information");
const isLoggedIn = !!clientInformation;
const acceptButton = document.getElementById("accept-cookie");
const declineButton = document.getElementById("dont-accept-cookie");

document.addEventListener("DOMContentLoaded", () => {
  if (hasDataLayer) {
    window.dataLayer.push({
      loggedIn: isLoggedIn,
      language:
        getCookieByKey(document.cookie, "webflow-user-language") || "en",
      ...(isLoggedIn && {
        visitorId: clientInformation?.loginid,
        currency: clientInformation?.currency,
        email: clientInformation?.email,
      }),
    });
  }

  // Check if pathname contains "eu" and tracking_status cookies are not set
  if (
    window.location.pathname.includes("eu") &&
    !getCookie(trackingStatusCookie) &&
    !getCookie(trackingStatusDeclineCookie)
  ) {
    popupElement.classList.remove("hide-element");
    document.body.classList.add("show-cookie");
  }

  // Event handlers for accept and decline buttons
  acceptButton?.addEventListener("click", () => {
    setCookie(trackingStatusCookie, true);
    popupElement.classList.add("hide-element");
    document.body.classList.remove("show-cookie");
  });

  declineButton?.addEventListener("click", () => {
    setCookie(trackingStatusDeclineCookie, true);
    setCookie(trackingStatusCookie, false);
    popupElement.classList.add("hide-element");
    document.body.classList.remove("show-cookie");
  });
});

if (
  window.isEuRegion(window.location.pathname) &&
  modal &&
  cancelRedirect &&
  proceedRedirect
) {
  const internalDomains = [
    "deriv.me",
    "deriv.be",
    "deriv.com",
    "app.deriv.me",
    "app.deriv.be",
    "app.deriv.com",
    "docs.deriv.com",
    "community.deriv.com",
    "deriv.statuspage.io",
    "signup.deriv.com",
    "login.deriv.com",
    "api.deriv.com",
  ];

  let pendingRedirect = "";
  let currentTarget = "_self";

  document.querySelectorAll("a").forEach(function (anchor) {
    const anchorUrl = new URL(anchor.href, window.location.href);
    const currentUrl = new URL(window.location.href);
    if (
      !internalDomains.includes(anchorUrl.host) &&
      anchorUrl.host !== currentUrl.host
    ) {
      anchor.addEventListener("click", function (event) {
        event.preventDefault();
        pendingRedirect = anchorUrl.href;
        currentTarget = anchor.target || "_self";
        modal.classList.remove("hide-element");
        document.body.style.overflow = "hidden";
      });
    }
  });

  cancelRedirect.addEventListener("click", function () {
    modal.classList.add("hide-element");
    document.body.style.overflow = "auto";
    pendingRedirect = "";
  });

  proceedRedirect.addEventListener("click", function () {
    if (pendingRedirect) {
      window.open(pendingRedirect, currentTarget);
      pendingRedirect = "";
      modal.classList.add("hide-element");
      document.body.style.overflow = "auto";
    }
  });
}
