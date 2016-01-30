var createRules = function() {
  // With a new rule ...
  chrome.declarativeContent.onPageChanged.addRules([
    {
      // That fires when a page's URL contains a 'g' ...
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { urlMatches: 'codepen.io.*full.*' },
        })
      ],
      // And shows the extension's page action.
      actions: [ new chrome.declarativeContent.ShowPageAction() ]
    }
  ]);
};

var handlePageActionClick = function(tab) {
  // get the state for this URL and see if it should be hidden or not
  chrome.storage.sync.get(tab.url, function(data){
    var hide = !(data[tab.url] && data[tab.url].hidden);
    var update = {};
    update[tab.url] = {hidden: hide};
    chrome.storage.sync.set(update);
  });
};

// When the extension is installed or upgraded ...
chrome.pageAction.onClicked.addListener(handlePageActionClick);

chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, createRules);
});
