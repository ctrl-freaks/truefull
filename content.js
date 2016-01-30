"use strict";

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

var handleMessage = function(message) {
  console.log('MESSAGE', message)
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log('MESSAGE', message);
  var success = false;
  if (message.action === 'hide') {
    success = changeHeaderDisplay(true);
  } else if (message.action === 'show') {
    success = changeHeaderDisplay();
  }
  sendResponse({success: success});
});
