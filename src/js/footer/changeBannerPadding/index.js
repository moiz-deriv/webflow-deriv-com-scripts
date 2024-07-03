// Adding padding at the top when opening and closing a banner starts here
const bannerDisclaimer = document.querySelector(".banner_disclaimer");
const mainWrapper = document.querySelector(".main-wrapper");

if (bannerDisclaimer) {
  let resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      if (entry.target === bannerDisclaimer) {
        let boundingRect = entry.target.getBoundingClientRect();
        if (mainWrapper) {
          mainWrapper.style.paddingTop = boundingRect.height + "px";
        } 
        // else {
        //   document.body.style.paddingTop = boundingRect.height + "px";
        // }
      }
    }
  });

  resizeObserver.observe(bannerDisclaimer);
}