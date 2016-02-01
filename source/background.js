var createRules = function() {
  // With a new rule ...
  chrome.declarativeContent.onPageChanged.addRules([
    {
      // That fires when a page's URL matches codepen.io "full"
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
    var hidden = !(data[tab.url] && data[tab.url].hidden);
    var update = {};
    update[tab.url] = {hidden: hidden};
    chrome.storage.sync.set(update);
  });
};

// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  // Add listener
  chrome.pageAction.onClicked.addListener(handlePageActionClick);
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, createRules);
});
