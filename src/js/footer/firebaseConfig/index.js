import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const isStaging = window.location.hostname.includes("staging");

const databaseURL = isStaging
  ? "https://app-config-staging.firebaseio.com"
  : "https://app-config-prod.firebaseio.com";

const firebaseConfig = {
  databaseURL: databaseURL,
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

export { db, ref, onValue };
