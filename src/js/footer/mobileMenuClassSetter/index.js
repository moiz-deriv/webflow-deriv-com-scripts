// This function adds a red line to the current accordion trigger
document.addEventListener("DOMContentLoaded", function () {
  // Find all accordion triggers
  let triggers = document.querySelectorAll(".navbar_accordion-trigger");
  let navbarMenuBtn = document.querySelector(".navbar_menu-button");

  if (document.querySelector(".new-navbar_component")) {
    const navbarComponent = document.querySelector(".new-navbar_component");
    navbarComponent.addEventListener("mouseenter", () => {
      if (window.innerWidth > 991) {
        document.body.classList.add("disable-scroll");
      }
    });
    navbarComponent.addEventListener("mouseleave", () => {
      if (window.innerWidth > 991) {
        document.body.classList.remove("disable-scroll");
      }
    });
  }

  if (navbarMenuBtn) {
    navbarMenuBtn.addEventListener("click", function () {
      let windowHeight = window.innerHeight;
      let navbarWrapper = document.querySelector(".new-navbar_main-wrapper");
      if (navbarWrapper) {
        let navbarHeight = navbarWrapper.offsetHeight;
        let calculatedHeight = windowHeight - navbarHeight;
        let navbarMenu = document.querySelector(".new-navbar_menu");
        if (navbarMenu) {
          navbarMenu.style.height = `${calculatedHeight}px`;
        }
      }
    });
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      // Remove the .current class from all triggers
      triggers.forEach((t) => t.classList.remove("current"));

      // Add the .current class to the clicked trigger
      this.classList.add("current");
    });
  });

  // Find the current page link in Navbar
  let currentLink = document.querySelector(".navbar_accordion-link.w--current");

  if (currentLink) {
    // Find the closest accordion item
    let accordionItem = currentLink.closest(".navbar_accordion-item");

    if (accordionItem) {
      // Find the trigger element within the found parent
      let trigger = accordionItem.querySelector(".navbar_accordion-trigger");

      if (trigger) {
        // Add the .current class to the trigger
        trigger.classList.add("current");
      }
    }
  }
});
