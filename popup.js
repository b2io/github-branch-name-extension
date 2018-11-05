document.addEventListener("DOMContentLoaded", () => {
  var button = document.querySelector("#generate-button");
  var notification = document.querySelector("#notification");

  function copyBranchName() {
    var branchName = chrome.extension.getBackgroundPage().branchName;

    copyToClipboard(branchName);
  }

  button.addEventListener("click", () => {
    copyBranchName();
    notification.style = "display: block";
  });
});
