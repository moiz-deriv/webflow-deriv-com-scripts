import { db, ref, onValue } from "../firebaseConfig";

let is_live_chat_visible = false;
let is_whatapp_visible = false;

function fetchChatData() {
  const dataRef = ref(db, "remote_config/deriv-com/chat.json");
  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    is_live_chat_visible = data.live_chat;
    is_whatapp_visible = data.whatsapp_chat;

    if (!is_whatapp_visible) {
      const whatapp_icon = document.querySelector(".whatsapp_chat");
      if (whatapp_icon) {
        whatapp_icon.style.visibility = "hidden";
      }
    }
    if (!is_live_chat_visible) {
      const livechat_icon = document.querySelector(".livechatbtn");
      if (livechat_icon) {
        livechat_icon.style.visibility = "hidden";
      }
    }
    //on scroll show live chat
    window.addEventListener("scroll", function () {
      if (is_live_chat_visible || is_whatapp_visible) {
        liveChatWrapper?.classList?.remove("hide-element");
      }
    });
  });
}

fetchChatData();
