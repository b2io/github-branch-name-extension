if (window === top) {
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    sendResponse(getBranchName());
  });
}

function getTextContent(element) {
  if (!element || !element.textContent) return null;

  return element.textContent.trim();
}

function getBranchName() {
  var ISSUE_TITLE_SELECTOR = ".js-issue-title";
  var ISSUE_NUMBER_SELECTOR = ".gh-header-number";
  var title = getTextContent(document.querySelector(ISSUE_TITLE_SELECTOR));
  var number = getTextContent(document.querySelector(ISSUE_NUMBER_SELECTOR));

  if (!title || !number) return "none";

  return `${number}-${title}`
    .slice(1)
    .toLowerCase()
    .replace(/\s+/g, "-");
}
