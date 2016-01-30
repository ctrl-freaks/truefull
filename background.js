var imagePaths = {
  shown: {
    19: 'icons/shown-19.png',
    38: 'icons/shown-38.png',
  },
  hidden: {
    19: 'icons/hidden-19.png',
    38: 'icons/hidden-38.png',
  },
};

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

var changeIcon = function(tab, hidden){
  var newImagePaths = hidden ? imagePaths.hidden : imagePaths.shown;
  chrome.pageAction.setIcon({
    tabId: tab.id, path: newImagePaths,
  });
};

var handlePageActionClick = function(tab) {
  // get the state for this URL and see if it should be hidden or not
  chrome.storage.sync.get(tab.url, function(data){
    var hidden = !(data[tab.url] && data[tab.url].hidden);
    var update = {};
    update[tab.url] = {hidden: hidden};
    chrome.storage.sync.set(update, function(){
      changeIcon(tab, hidden);
    });
  });
};

chrome.webNavigation.onCompleted.addListener(function(details) {
  console.log(details)
});

// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  // Add listener
  chrome.pageAction.onClicked.addListener(handlePageActionClick);
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, createRules);
});
