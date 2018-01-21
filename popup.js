function isEmpty(text) {
  return text === undefined || text === null || text.trim().length === 0;
}

function copyToClipboard(text) {
  if (isEmpty(text)) return;

  function handleCopy(event) {
    document.removeEventListener("copy", handleCopy, true);
    event.stopImmediatePropagation(); // prevent tampering
    event.preventDefault();
    event.clipboardData.setData("text/plain", text);
  }

  document.addEventListener("copy", handleCopy, true);
  document.execCommand("copy");
}

document.addEventListener("DOMContentLoaded", () => {
  var button = document.getElementById("generate-button");

  function copyBranchName() {
    var branchName = chrome.extension.getBackgroundPage().branchName;

    copyToClipboard(branchName);
  }

  function notify(text) {
    var node = document.createElement("p");
    var text = document.createTextNode(text);
    node.appendChild(text);
    node.style =
      "background-color: #c2e0c6; margin: 0 0 5px; padding: 5px 15px";

    document.body.insertBefore(node, button);
  }

  button.addEventListener("click", () => {
    copyBranchName();
    notify("Copied to clipboard!");
  });
});
