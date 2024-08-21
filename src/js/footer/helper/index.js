import { getCookieByKey } from "../cookies";

// Global helper functions
window.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

window.toggleErrorField = (element, isValid) => {
  if (isValid) {
    element.classList.remove("error-field");
  } else {
    element.classList.add("error-field");
  }
};

window.disableButton = function (button) {
  button.disabled = true;
  button.style.opacity = "0.5";
};

window.isEuRegion = function (pathname) {
  const normalizedPath = pathname.replace(/\/$/, "");

  const pattern = /^\/(?:[^\/]+\/)?eu(?:\/|$)/;

  return pattern.test(normalizedPath);
};
window.enableButton = function (button) {
  button.disabled = false;
  button.style.opacity = "1";
};

window.getOauthUrl = function () {
  var fullUrl = window.location.href;
  var url = new URL(fullUrl);
  var domain = url.hostname;
  var validDomains = ["deriv.com", "deriv.be", "deriv.me"];

  var matchedDomain = validDomains.find((validDomain) =>
    domain.endsWith(validDomain)
  );

  var oauthUrl = matchedDomain
    ? `https://oauth.${matchedDomain}`
    : `https://oauth.deriv.com`;

  return oauthUrl;
};
window.getClientCountry = function () {
  const clientsCountry = getCookieByKey(document.cookie, "clients_country");
  const client_cookie = getCookieByKey(document.cookie, "client_information");
  if (!!client_cookie) {
    return JSON.parse(client_cookie)?.residence || clientsCountry;
  } else {
    return clientsCountry;
  }
};

window.deriv_com_url = "deriv.com";
window.deriv_me_url = "deriv.me";
window.deriv_be_url = "deriv.be";
window.webflow_domain = "webflow.deriv.com";
window.staging_url = "staging.deriv.com";
window.staging_deriv_be_url = "staging.deriv.be";

window.domain_list_app_id = {
  [window.deriv_com_url]: "16929",
  [window.deriv_me_url]: "1411",
  [window.deriv_be_url]: "30767",
  [window.webflow_domain]: "53503",
  [window.staging_url]: "16303",
};

window.getDomain = () => {
  var currentUrl = window.location.href;
  var domain = new URL(currentUrl).hostname;
  return domain;
};

window.getAppId = () => {
  const domainUrl = window.getDomain();
  const url_params = new URLSearchParams(window.location.search || "");
  const url_param_app_id = url_params.get("app_id");

  if (url_param_app_id) {
    return url_param_app_id;
  }

  const localStorageAppId = localStorage.getItem("config.app_id");
  if (localStorageAppId) {
    return localStorageAppId;
  }

  const specificDomainAppId = {
    [window.webflow_domain]: window.domain_list_app_id[window.webflow_domain],
    [window.deriv_be_url]: window.domain_list_app_id[window.deriv_be_url],
    [window.deriv_me_url]: window.domain_list_app_id[window.deriv_me_url],
    [window.staging_url]: window.domain_list_app_id[window.staging_url],
  };

  if (specificDomainAppId[domainUrl]) {
    return specificDomainAppId[domainUrl];
  }

  return window.domain_list_app_id[window.deriv_com_url];
};
