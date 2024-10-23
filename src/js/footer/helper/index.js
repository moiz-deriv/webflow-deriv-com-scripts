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

//Login Generation Code Block
const getCookiesFields = () => [
  "utm_source",
  "utm_ad_id",
  "utm_adgroup_id",
  "utm_adrollclk_id",
  "utm_campaign",
  "utm_campaign_id",
  "utm_content",
  "utm_fbcl_id",
  "utm_gl_client_id",
  "utm_medium",
  "utm_msclk_id",
  "utm_term",
];

const getUTMData = () => {
  const utmDataString = getCookieByKey(document.cookie, "utm_data");
  if (utmDataString) {
    const utmData = JSON.parse(utmDataString);
    const cookiesFields = getCookiesFields();
    const filteredData = {};

    cookiesFields.forEach((field) => {
      if (utmData.hasOwnProperty(field)) {
        filteredData[field] = utmData[field];
      }
    });

    return filteredData;
  }
  return null;
};

const getDataLink = (data) => {
  let data_link = "";
  if (data) {
    Object.keys(data).forEach((elem) => {
      data_link += `&${elem}=${data[elem]}`;
    });
  }
  return data_link;
};

const getDomainAppID = () => {
  const domainUrl = window.getDomain();
  if (domainUrl === window.deriv_me_url) {
    return window.domain_list_app_id[window.deriv_me_url];
  } else if (domainUrl === window.deriv_be_url) {
    return window.domain_list_app_id[window.deriv_be_url];
  } else if (domainUrl === window.webflow_domain) {
    return window.domain_list_app_id[window.webflow_domain];
  } else {
    return window.domain_list_app_id[window.deriv_com_url];
  }
};

export const loginUrl = () => {
  const server_url = localStorage.getItem("config.server_url");
  const langCookie = getCookieByKey(document.cookie, "webflow-user-language");
  let language = langCookie ? langCookie.toLowerCase() : "en";

  if (language === "zh-cn" || language === "zh-tw") {
    language = language.replace("-", "_");
  }
  const cookies_value = getUTMData();
  const cookies_link = getDataLink(cookies_value);

  const affiliate_token = getCookieByKey(document.cookie, "affiliate_tracking");

  const affiliate_token_link = affiliate_token
    ? `&affiliate_token=${affiliate_token}`
    : "";

  // Function which returns sub path to the specific trading platforms
  const supported_platforms = ["mt5", "bot", "derivx"];
  const redirectToTradingPlatform = () => {
    supported_platforms.filter(
      (platform) => window.location.pathname.includes(platform) && platform
    );
  };
  const sub_url = redirectToTradingPlatform() || "";

  if (server_url && /qa/.test(server_url)) {
    return `https://${server_url}/oauth2/authorize?app_id=${window.getAppId()}&l=${language}&brand=deriv${affiliate_token_link}${cookies_link}&platform=${sub_url}`;
  }
  return `${window.getOauthUrl()}/oauth2/authorize?app_id=${getDomainAppID()}&l=${language}&brand=deriv${affiliate_token_link}${cookies_link}&platform=${sub_url}`;
};

const handleOutSystemsRedirection = () => {
  const currentDomain = window.location.hostname;
  let env;
  if (
    currentDomain === "deriv.com" ||
    currentDomain === "deriv.be" ||
    currentDomain === "deriv.me"
  ) {
    env = "production";
  } else if (currentDomain === "staging.deriv.com") {
    env = "staging";
  } else {
    env = "development";
  }
  switch (env) {
    case "production":
      return "https://hub.deriv.com/tradershub/preload-helper";
    case "staging":
      return "https://staging-hub.deriv.com/tradershub/preload-helper";
    default:
      return "https://hub.deriv.com/tradershub/preload-helper";
  }
};

const isUserLoggedIn = !!getCookieByKey(document.cookie, "client_information");
if (!isUserLoggedIn) {
  var iframe = document.createElement("iframe");
  iframe.src = handleOutSystemsRedirection();
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "none";
  iframe.style.visibility = "hidden";
  iframe.setAttribute("sandbox", "allow-same-origin allow-scripts");
  document.body.appendChild(iframe);
}
