document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll("button, a");
  elements.forEach((element) => {
    let textContent = element.textContent.trim().split(" ")[0].toLowerCase();
    let parentSection =
      element.closest("section")?.className ||
      element.closest("div")?.className ||
      "";
    let parentClass = parentSection.split(" ")[0];
    if (parentClass) {
      parentClass = parentClass.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    }
    element.setAttribute(
      "data-attributes",
      `btn-${textContent}-${parentClass}`
    );
  });
});
