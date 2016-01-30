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

chrome.storage.onChanged.addListener(function(changes){
  var thisChange = changes[location.href];
  if (thisChange) {
    console.log(thisChange)
    var hide = !thisChange.newValue.hidden;
    changeHeaderDisplay(hide);
  }
});
