document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".new-navbar_component")) {
    // Find the .new-navbar_component element
    const navbarComponent = document.querySelector(".new-navbar_component");

    // Add event listeners for hover
    navbarComponent.addEventListener("mouseenter", () => {
      if (window.innerWidth > 991) {
        disableScroll();
      }
    });
    navbarComponent.addEventListener("mouseleave", () => {
      if (window.innerWidth > 991) {
        enableScroll();
      }
    });

    // Function to disable scroll
    function disableScroll() {
      document.body.classList.add("disable-scroll");
    }

    // Function to enable scroll
    function enableScroll() {
      document.body.classList.remove("disable-scroll");
    }
  }
});
