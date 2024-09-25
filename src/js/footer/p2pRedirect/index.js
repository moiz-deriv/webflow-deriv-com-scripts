import { getCookieByKey } from "../cookies";

document.addEventListener("DOMContentLoaded", function () {
  const lang = getCookieByKey(document.cookie, "webflow-user-language");
  const countriesToRedirect = [
    "as",
    "au",
    "at",
    "be",
    "bg",
    "ca",
    "hr",
    "cy",
    "cz",
    "dk",
    "ee",
    "fi",
    "fr",
    "gr",
    "gu",
    "gg",
    "hk",
    "hu",
    "ir",
    "ie",
    "im",
    "il",
    "it",
    "je",
    "ng",
    "mm",
    "sy",
    "kp",
    "lv",
    "lt",
    "lu",
    "my",
    "mt",
    "nl",
    "nz",
    "mp",
    "py",
    "pl",
    "pt",
    "pr",
    "ro",
    "rw",
    "sk",
    "si",
    "es",
    "se",
    "ae",
    "gb",
    "us",
    "um",
    "vu",
    "vi",
    "ky",
    "cu",
    "de",
  ];

  if (
    window.location.pathname.endsWith("p2p") &&
    !window.location.pathname.startsWith("/blog")
  ) {
    const clientsCountry = window.getClientCountry();
    if (clientsCountry && countriesToRedirect.includes(clientsCountry)) {
      if (lang === "en") {
        window.location.replace("/404");
      } else {
        window.location.replace(`/${lang}/404`);
      }
    }
  }

  if (getCookieByKey(document.cookie, "client_information") !== undefined) {
    let purchaseButtons = document.querySelectorAll(
      "a.live-markets_button.is-secondary.is-small.is-purchase.w-button"
    );

    let sellButtons = document.querySelectorAll(
      "a.live-markets_button.is-secondary.is-small.is-sell.w-button"
    );

    function updateHref(buttons) {
      buttons.forEach((button) => {
        button.href = "https://app.deriv.com/appstore/traders-hub";
      });
    }

    updateHref(purchaseButtons);
    updateHref(sellButtons);
  }
});
