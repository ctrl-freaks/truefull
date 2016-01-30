"use strict";

var url = location.href;

var changeHeaderDisplay = function(hide){
  var header = document.getElementById('main-header');
  var iframe = document.getElementById('result-iframe-wrap');

  if (header) {
    header.style = hide ? 'display: none' : '';
  } else {
    return false; // failed
  }

  if (iframe) {
    // iframes only exist on full page views
    iframe.style = hide ? 'height:100%' : '';
  }

  return true;
};

chrome.storage.onChanged.addListener(function(changes){
  var thisChange = changes[url];
  if (thisChange) {
    changeHeaderDisplay(thisChange.newValue.hidden);
  }
});

// on initial run revive to any old settings
chrome.storage.sync.get(url, function(data){
  var hide = (data[url] && data[url].hidden);
  changeHeaderDisplay(hide);
});
