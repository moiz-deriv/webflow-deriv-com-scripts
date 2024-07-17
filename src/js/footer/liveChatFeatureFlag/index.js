import { db, ref, onValue } from "../firebaseConfig";

let is_live_chat_visible = false;
let is_whatapp_visible = false;

function fetchChatData() {
  const liveChatWrapper = document.getElementById("live_chat-wrapper");
  const dataRef = ref(db, "remote_config/deriv-com/chat");
  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    is_live_chat_visible = data.live_chat;
    is_whatapp_visible = data.whatsapp_chat;

    const whatapp_icon = document.querySelector(".whatsapp_chat");
    const livechat_icon = document.querySelector(".livechatbtn");

    // Toggle visibility for WhatsApp icon if available
    if (whatapp_icon) {
      whatapp_icon.style.visibility = is_whatapp_visible ? "visible" : "hidden";
    }

    // Toggle visibility for Live Chat icon if available
    if (livechat_icon) {
      livechat_icon.style.visibility = is_live_chat_visible
        ? "visible"
        : "hidden";
    }

    //on scroll show live chat
    window.addEventListener("scroll", function () {
      if (is_live_chat_visible || is_whatapp_visible) {
        liveChatWrapper?.classList?.remove("hide-element");
      }
      if (is_live_chat_visible && is_whatapp_visible) {
        liveChatWrapper?.classList?.add("hide-element");
      }
    });
  });
}

fetchChatData();
