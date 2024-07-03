// This function is needed to close the menu if the page was loaded using the browser back button (from cache)
window.addEventListener('pageshow', function (event) {
  // Checking if the page was loaded from the cache
  if (event.persisted) {
    const mobileMenu = document.querySelector('.w-nav-overlay');
  	if (mobileMenu) {
      mobileMenu.style.display = 'none';
   		document.querySelector('body').click();
    }
  }
});
