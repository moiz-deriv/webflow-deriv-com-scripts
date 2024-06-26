import { hideElems, showElems } from "./data.js";
import { getCookieByKey } from "../cookies";
const clientsCountry = getCookieByKey(document.cookie, "clients_country");
hideElems.forEach((array) => {
  const shouldHide =
    array.id === "hideDiel"
      ? !array.countries.includes(clientsCountry)
      : array.countries.includes(clientsCountry);

  if (shouldHide) {
    if (clientsCountry) {
      return array.selectors.forEach((selectorString) => {
        const selectors = document.querySelectorAll(selectorString);
        selectors.forEach((selector) => {
          if (selector) {
            selector.style.display = "none";
          }
        });
      });
    }
  }
    const dielIcons = document.querySelector(".footer_social-icons.diel");
    if (dielIcons) {
      dielIcons?.style?.display = "flex";
    }
});

showElems.forEach((array) => {
  if (clientsCountry && array.countries.includes(clientsCountry)) {
    array.selectors.forEach((selectorString) => {
      const selectors = document.querySelectorAll(selectorString);
      selectors.forEach((selector) => {
        if (selector) {
          if (selectorString === ".banner_disclaimer") {
            selector.classList.remove("hide-element");
          } else {
            selector.style.display = "block";
          }
        }
      });
    });
  } else {
    array.selectors.forEach((selectorString) => {
      const selectors = document.querySelectorAll(selectorString);
      selectors.forEach((selector) => {
        if (selector) {
          selectorString === ".banner_disclaimer"
            ? selector.classList.add("hide-element")
            : (selector.style.display = "none");
        }
      });
    });
  }
});
