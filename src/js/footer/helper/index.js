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