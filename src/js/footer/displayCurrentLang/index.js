document.addEventListener("DOMContentLoaded", function () {
  let currentLocaleElement = document.querySelector(
    ".locale > .new-navbar_dropdown-link.w--current"
  );
  if (currentLocaleElement) {
    let currentLocaleIsoCode = currentLocaleElement.getAttribute("hreflang");
    let currentLocaleIsoCodeTexts = document.querySelectorAll(
      ".current-locale-iso-code"
    );
    if (currentLocaleIsoCode && currentLocaleIsoCodeTexts.length) {
      for (let currentLocaleIsoCodeText of currentLocaleIsoCodeTexts) {
        currentLocaleIsoCodeText.innerText = currentLocaleIsoCode;
      }
    }
  }
});
