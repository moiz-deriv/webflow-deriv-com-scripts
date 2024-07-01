import { setCookie, getCookieByKey } from "../cookies";
import populateFooterComponent from "../footerComponent";

const message = JSON.stringify({ website_status: 1 });
const messageType = "website_status";

const clientsCountryFromCookie = getCookieByKey(
  document.cookie,
  "clients_country"
);

async function fetchCountryAndPopulateFooter() {
    try {
      const response = await fetch("https://www.cloudflare.com/cdn-cgi/trace");
      const text = await response.text();
      const CloudflareCountry = Object.fromEntries(
        text.split("\n").map(v => v.split("=", 2))
      ).loc.toLowerCase();
    
      if (CloudflareCountry !== clientsCountryFromCookie) {
        setCookie("clients_country", CloudflareCountry, 30);
      }
      populateFooterComponent();
    } catch (error) {
      console.error('Error:', error);
      populateFooterComponent();
    }
  }

  fetchCountryAndPopulateFooter()
window
  .socketMessageSend(message, messageType)
  .then((response) => {
    if (clientsCountryFromCookie !== response.website_status.clients_country)
      setCookie("clients_country", response.website_status.clients_country, 30);
    populateFooterComponent();
  })
  .catch((error) => {
    console.error("Error received:", error);
  });
