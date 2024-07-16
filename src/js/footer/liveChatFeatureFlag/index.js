import { db, ref, onValue } from "./firebaseConfig.js";

function fetchChatData() {
  const dataRef = ref(db, "remote_config/deriv-com/chat.json");
  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
}

fetchChatData();
