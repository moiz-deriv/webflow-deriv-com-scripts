// Global helper functions
window.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

window.toggleErrorField = (element, isValid) => {
  if (isValid) {
      element.classList.remove('error-field');
  } else {
      element.classList.add('error-field');
  }
};

// Function to disable the submit button
window.disableButton = function(button) {
  button.disabled = true;
  button.style.opacity = '0.5';
};

// Function to enable the submit button
window.enableButton = function(button) {
  button.disabled = false;
  button.style.opacity = '1';
};

window.getOauthUrl = function() {
  var fullUrl = window.location.href;
  var url = new URL(fullUrl);
  var domain = url.hostname;
  var validDomains = ['deriv.com', 'deriv.be', 'deriv.me'];

  var matchedDomain = validDomains.find(validDomain => domain.endsWith(validDomain));

  var oauthUrl = matchedDomain ? `https://oauth.${matchedDomain}` : `https://oauth.deriv.com`;

  return oauthUrl;
};
