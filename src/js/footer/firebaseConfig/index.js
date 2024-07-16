import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://app-config-prod.firebaseio.com",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

export { db, ref, onValue };
