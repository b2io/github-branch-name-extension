document.addEventListener("DOMContentLoaded", () => {
  var button = document.getElementById("generate-button");

  function copyBranchName() {
    var branchName = chrome.extension.getBackgroundPage().branchName;

    copyToClipboard(branchName);
  }

  // TODO: Display notification when branch has been copied
  button.addEventListener("click", copyBranchName);
});
