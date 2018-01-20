if (window == top) {
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    sendResponse(getBranchName());
  });
}

function getBranchName() {
  var ISSUE_TITLE_SELECTOR = ".js-issue-title";
  var ISSUE_NUMBER_SELECTOR = ".gh-header-number";

  var title = document.querySelector(ISSUE_TITLE_SELECTOR).textContent.trim();
  var number = document.querySelector(ISSUE_NUMBER_SELECTOR).textContent.trim();

  return `${number}-${title}`
    .slice(1)
    .toLowerCase()
    .replace(/\s+/g, "-");
}
