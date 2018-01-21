var branchName = null;
var urlRegex = new RegExp(
  "https://(www.)?github.com/(.+)/issues/([0-9]+)",
  "i"
);

function isGitHubIssueUrl(url) {
  return urlRegex.test(url);
}

function updateBranchName(tabId) {
  chrome.tabs.sendMessage(tabId, {}, name => {
    branchName = name;
  });
}

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  if (isGitHubIssueUrl(tab.url)) chrome.pageAction.show(tabId);
  else chrome.pageAction.hide(tabId);

  if (change.status === "complete") {
    updateBranchName(tabId);
  }
});

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  var currentTab = tabs[0];

  updateBranchName(currentTab.id);
});
