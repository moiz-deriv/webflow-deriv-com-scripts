// This function is needed to close the menu if the page was loaded using the browser back button (from cache)
window.addEventListener('pageshow', function (event) {
  // Checking if the page was loaded from the cache
  if (event.persisted) {
    document.querySelector('body').click();
  }
});
