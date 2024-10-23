document.addEventListener("DOMContentLoaded", () => {
  var targetPaths = [
    "/careers",
    "/locations",
    "/derivtech",
    "/derivlife",
    "/eu-careers",
    "/our-locations",
    "/product-explorer",
    "/academy",
    "/trading-terms-glossary",
  ];
  var path = window.location.pathname;
  if (targetPaths.some((targetPath) => path.includes(targetPath))) {
    var headTag = document.head;
    var linkElements = headTag.querySelectorAll("link");
    linkElements.forEach(function (linkElement) {
      if (linkElement.hasAttribute("hreflang")) {
        if (linkElement.getAttribute("hreflang") !== "x-default") {
          linkElement.remove();
        }
      }
    });
  }
});
