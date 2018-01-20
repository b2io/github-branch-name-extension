function copyToClipboard(text) {
  function handleCopy(event) {
    document.removeEventListener("copy", handleCopy, true);
    event.stopImmediatePropagation(); // prevent tampering
    event.preventDefault();
    event.clipboardData.setData("text/plain", text);
  }

  document.addEventListener("copy", handleCopy, true);
  document.execCommand("copy");
}
