const modal = document.querySelector(".redirection_background-wrapper");
const cancelRedirect = document.getElementById("cancel-redirect");
const proceedRedirect = document.getElementById("proceed-redirect");
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
