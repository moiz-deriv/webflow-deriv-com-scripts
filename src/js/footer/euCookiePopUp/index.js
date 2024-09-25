import { getCookieByKey } from "../cookies";

document.addEventListener("DOMContentLoaded", () => {
  class CookieStorage {
    constructor(cookieName) {
      this.cookieName = cookieName;
    }

    setItem(value) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30); // 30 days from now
      const expires = "expires=" + expiryDate.toUTCString();
      const cookieValue = encodeURIComponent(JSON.stringify(value));
      document.cookie = `${this.cookieName}=${cookieValue};${expires};path=/`;
    }
    getItem() {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(`${this.cookieName}=`)) {
          let cookieValue = cookie.substring(`${this.cookieName}=`.length);
          return JSON.parse(decodeURIComponent(cookieValue));
        }
      }
      return null;
    }
  }

  const tracking_status_cookie = new CookieStorage("tracking_status");
  const tracking_status_cookie_declined = new CookieStorage(
    "tracking_status_decline"
  );

  const popupElement = document.querySelector(".cookies_background-wrapper");

  //set datalayer details
  const has_dataLayer = window.dataLayer;
  const client_information = getCookieByKey(
    document.cookie,
    "client_information"
  );
  const is_logged_in = !!client_information;
  has_dataLayer &&
    window.dataLayer.push({
      loggedIn: is_logged_in,
      language:
        getCookieByKey(document.cookie, "webflow-user-language") || "en",
      ...(is_logged_in && {
        visitorId: client_information?.loginid,
        currency: client_information?.currency,
        email: client_information?.email,
      }),
    });

  // Check if pathname contains "eu" and tracking_status_cookie is null

  if (
    window.location.pathname.includes("eu") &&
    !tracking_status_cookie.getItem() &&
    !tracking_status_cookie_declined.getItem()
  ) {
    popupElement.classList.remove("hide-element");
    document.body.classList.add("show-cookie");
  }

  // Select the accept and decline buttons
  const acceptButton = document.getElementById("accept-cookie");
  const declineButton = document.getElementById("dont-accept-cookie");

  acceptButton?.addEventListener("click", function () {
    tracking_status_cookie.setItem(true);
    popupElement.classList.add("hide-element");
    document.body.classList.remove("show-cookie");
  });

  declineButton?.addEventListener("click", function () {
    tracking_status_cookie_declined.setItem(true);
    tracking_status_cookie.setItem(false);
    popupElement.classList.add("hide-element");
    document.body.classList.remove("show-cookie");
  });
});
