document.addEventListener("DOMContentLoaded", () => {
  var button = document.getElementById("generate-button");

  function copyBranchName() {
    var branchName = chrome.extension.getBackgroundPage().branchName;

    copyToClipboard(branchName);
  }

  button.addEventListener("click", copyBranchName);
});
