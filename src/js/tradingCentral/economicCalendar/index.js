import iFrameResize from "../resizeIframe";
import { loginUrl } from "../../footer/helper";
import { getCookieByKey } from "../../footer/cookies";

window.onload = function () {
  const user_language =
    getCookieByKey(document.cookie, "webflow-user-language")?.toLowerCase() ||
    "en";

  const container = document.getElementById("economic-calendar");
  var iframe = document.createElement("iframe");
  iframe.id = "tradingcentral";
  iframe.allowFullscreen = true;
  iframe.frameBorder = "0";
  iframe.scrolling = "no";
  iframe.width = "90%";
  iframe.height = "1500";
  iframe.src = `https://site.tradingcentral.com/faz9ua/serve.shtml?page=economic_calendar_prelogin&loginurl=${loginUrl()}&signupurl=${
    window.location.origin + "/" + user_language + "/signup"
  }`;
  container.appendChild(iframe);
  iFrameResize();
};
