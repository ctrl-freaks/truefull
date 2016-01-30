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
  console.log(tab.url);

  chrome.storage.sync.get(tab.url, function(data){
    console.log('DATA', data);
    var hide = !(data[tab.url] && data[tab.url].hidden);
    var action =  hide ? 'hide' : 'show';
    chrome.tabs.sendMessage(tab.id, {action: action}, function(response) {
      if (response.success) {
        var update = {};
        update[tab.url] = {hidden: hide};
        console.log('UPDATE', update);
        chrome.storage.sync.set(update);
      }
    });
  });
};

// When the extension is installed or upgraded ...
chrome.pageAction.onClicked.addListener(handlePageActionClick);

chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, createRules);
});
