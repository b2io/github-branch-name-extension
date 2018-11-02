if (window === top) {
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.addButton) addBranchNameButton();
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

const BUTTON_ID = "get-branch-name-button";

function addBranchNameButton() {
  if (document.getElementById(BUTTON_ID)) return;
  const githubHeader = document.getElementsByClassName("gh-header-actions")[0];
  if (!githubHeader) return;

  var branchNameButton = document.createElement("button");
  branchNameButton.id = BUTTON_ID;
  branchNameButton.innerText = "Branch Name";
  branchNameButton.classList.add("btn");
  branchNameButton.classList.add("btn-sm");

  branchNameButton.addEventListener(
    "click",
    function() {
      copyToClipboard(getBranchName());
      branchNameButton.innerText = "Copied";
      branchNameButton.style.backgroundColor = "#c2e0c6";
      branchNameButton.style.backgroundImage = "none";
      setTimeout(function() {
        branchNameButton.innerText = "Branch Name";
        branchNameButton.style.backgroundColor = null;
        branchNameButton.style.backgroundImage = null;
      }, 1000);
    },
    false
  );

  githubHeader.insertBefore(branchNameButton, githubHeader.firstChild);
}

addBranchNameButton();
