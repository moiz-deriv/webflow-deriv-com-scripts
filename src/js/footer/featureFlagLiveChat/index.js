// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
// Firebase configuration
const firebaseConfig = {
  databaseURL: "https://app-config-prod.firebaseio.com",
};
// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

function fetchData() {
  const db = getDatabase(firebaseApp);
  // Function to fetch data from Realtime Database
  const dataRef = ref(db, `remote_config/deriv-com/chat`);
  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
}
fetchData();
