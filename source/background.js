console.log('background init');

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
  console.log('click on', tab);
  // get the state for this URL and see if it should be hidden or not
  chrome.storage.sync.get(tab.url, function(data){
    console.log('data', data);
    var hidden = !(data[tab.url] && data[tab.url].hidden);
    var update = {};
    update[tab.url] = {hidden: hidden};
    chrome.storage.sync.set(update, function(){
      chrome.tabs.executeScript(null, {file: 'content.js'});
    });
  });
};

// Add listener
chrome.pageAction.onClicked.addListener(handlePageActionClick);

// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, createRules);
});
