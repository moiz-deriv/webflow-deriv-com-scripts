// Adding padding at the top when opening and closing a banner starts here
  let bannerDisclaimer = document.querySelector('.banner_disclaimer');
  let pageWrapper = document.querySelector('.page-wrapper');


  if (bannerDisclaimer) {
    let resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.target === bannerDisclaimer) {
          if (pageWrapper) {
            pageWrapper.style.paddingTop = entry.contentRect.height + 'px';
          } else {
            document.body.style.paddingTop = entry.contentRect.height + 'px';
          }
        }
      }
    });


    resizeObserver.observe(bannerDisclaimer);
  }
