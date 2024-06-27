// Adding padding at the top when opening and closing a banner starts here
document.addEventListener('DOMContentLoaded', function() {
  const bannerDisclaimer = document.querySelector('.banner_disclaimer');
  let pageWrapper = document.querySelector('.page-wrapper');

  if (bannerDisclaimer) {
    let resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.target === bannerDisclaimer) {
          let boundingRect = entry.target.getBoundingClientRect();
          if (pageWrapper) {
            pageWrapper.style.paddingTop = boundingRect.height + 'px';
          } else {
            document.body.style.paddingTop = boundingRect.height + 'px';
          }
        }
      }
    });

    resizeObserver.observe(bannerDisclaimer);
  }
});
