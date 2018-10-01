if (window === top) {
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.addButton) addBranchNameButton();
    else sendResponse(getBranchName());
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

  var getBranchNameButton = document.createElement("button");
  getBranchNameButton.id = BUTTON_ID;
  getBranchNameButton.innerText = "Branch Name";
  getBranchNameButton.classList.add("btn");
  getBranchNameButton.classList.add("btn-sm");

  getBranchNameButton.addEventListener(
    "click",
    function() {
      copyToClipboard(getBranchName());
      getBranchNameButton.innerText = "Copied";
      getBranchNameButton.style.backgroundColor = "#c2e0c6";
      getBranchNameButton.style.backgroundImage = "none";
      setTimeout(function() {
        getBranchNameButton.innerText = "Branch Name";
        getBranchNameButton.style.backgroundColor = null;
        getBranchNameButton.style.backgroundImage = null;
      }, 1000);
    },
    false
  );

  githubHeader.insertBefore(getBranchNameButton, githubHeader.firstChild);
}

addBranchNameButton();
