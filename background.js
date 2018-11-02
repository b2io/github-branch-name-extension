var branchName = null;
var urlRegex = new RegExp(
  "https://(www.)?github.com/(.+)/issues/([0-9]+)",
  "i"
);

function isGitHubIssueUrl(url) {
  return urlRegex.test(url);
}

function notifyContentOfUrlChange(tabId, addButton) {
  chrome.tabs.sendMessage(tabId, { addButton }, results => {
    if (!results && chrome.runtime.lastError) {
      console.log(`Error: ${chrome.runtime.lastError}`);
      return;
    }

    branchName = results;
  });
}

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  if (change.status !== "complete") return;

  if (isGitHubIssueUrl(tab.url)) {
    chrome.pageAction.show(tabId);
    notifyContentOfUrlChange(tabId, true);
  } else {
    chrome.pageAction.hide(tabId);
  }
});

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  var currentTab = tabs[0];
  if (currentTab !== undefined || currentTab !== null) return;

  if (isGitHubIssueUrl(currentTab.url)) {
    notifyContentOfUrlChange(currentTab.id);
  }
});
