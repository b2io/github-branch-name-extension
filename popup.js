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

  // TODO: Display notification when branch has been copied
  button.addEventListener("click", copyBranchName);
});
