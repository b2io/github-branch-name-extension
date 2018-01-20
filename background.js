var branchName = "default";

function updateBranchName(tabId) {
  chrome.pageAction.show(tabId); // TODO: Should not show all the time
  chrome.tabs.sendMessage(tabId, {}, name => {
    branchName = name;
  });
}

chrome.tabs.onUpdated.addListener(function(tabId, change) {
  if (change.status === "complete") {
    updateBranchName(tabId);
  }
});

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  updateBranchName(tabs[0].id);
});
