// this code ensures opening a list of languages on mobile starting from the top
document.addEventListener("DOMContentLoaded", function () {
  let langMobButton = document.querySelector(".lang-mob");
  if (langMobButton) {
    langMobButton.addEventListener("click", function () {
      let mobileMenuWrapper = document.querySelector(
        ".new-navbar_menu-wrapper"
      );
      if (mobileMenuWrapper) {
        mobileMenuWrapper.scrollBy({ top: -3000 });
      }
    });
  }
});
