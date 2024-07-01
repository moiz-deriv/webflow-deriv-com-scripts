import { setCookie, getCookieByKey } from "../cookies";
import footerComponent from "../footerComponent";

const message = JSON.stringify({ website_status: 1 });
const messageType = "website_status";

const clientsCountryFromCookie = getCookieByKey(
  document.cookie,
  "clients_country"
);
const CloudflareCountry = Object.fromEntries(
  (await (await fetch("https://www.cloudflare.com/cdn-cgi/trace")).text())
    .split("\n")
    .map((v) => v.split("=", 2))
).loc; // this gets the clientsCountry from Cloudflare for temporary use.
if (CloudflareCountry !== clientsCountryFromCookie) {
  setCookie("clients_country", CloudflareCountry, 30);
}
footerComponent();
window
  .socketMessageSend(message, messageType)
  .then((response) => {
    if (clientsCountryFromCookie !== response.website_status.clients_country)
      setCookie("clients_country", response.website_status.clients_country, 30);
    footerComponent();
  })
  .catch((error) => {
    console.error("Error received:", error);
  });
