import { getCookieByKey } from "../cookies";

const allowedLangs = ["en", "fr", "de", "it", "es", "pt", "pl", "ru"];

document.addEventListener("DOMContentLoaded", function () {
  let languageCookie = getCookieByKey(document.cookie, "webflow-user-language");
  let signupLink = "";
  if (
    languageCookie.toLowerCase() === "en" &&
    window.location.pathname.includes("/eu/")
  ) {
    signupLink = window.location.origin + "/eu/signup";
  } else {
    if (languageCookie.toLowerCase() === "en") {
      signupLink = window.location.origin + "/signup";
    } else {
      if (window.location.pathname.includes("/eu/")) {
        signupLink =
          window.location.origin + "/" + languageCookie + "/eu/signup";
      } else {
        signupLink = window.location.origin + "/" + languageCookie + "/signup";
      }
    }
  }

  const signupBtn = Array.from(document.querySelectorAll("a")).filter((link) =>
    link.href.includes(signupLink)
  );
  if (
    allowedLangs.includes(
      languageCookie.toLowerCase() && window.location.pathname.includes("/eu/")
    )
  ) {
    signupBtn.forEach((link) => {
      link.href = `${window.location.origin}/eu/signup?lang=${languageCookie}`;
    });
  } else {
    if (allowedLangs.includes(languageCookie.toLowerCase())) {
      signupBtn.forEach((link) => {
        link.href = `${window.location.origin}/signup?lang=${languageCookie}`;
      });
    }
  }
});
