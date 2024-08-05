function handleMutations(mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.addedNodes.length) {
      for (const node of mutation.addedNodes) {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.id === "chat-widget-minimized"
        ) {
          node.style.opacity = "0";
        }
      }
    }
  }
}

const observer = new MutationObserver(handleMutations);

observer.observe(document.body, { childList: true, subtree: true });
