import { setCookie, getCookieByKey } from "../cookies";
const message = JSON.stringify({ website_status: 1 });
const messageType = "website_status";

const clientsCountry = getCookieByKey(document.cookie, "clients_country");
console.log("clientsCountry", clientsCountry);
  window
    .socketMessageSend(message, messageType)
    .then((response) => {
      setCookie("clients_country", response.website_status.clients_country, 30);
    })
    .catch((error) => {
      console.error("Error received:", error);
    });
