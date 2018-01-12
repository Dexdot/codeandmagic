'use strict';

(function() {
  var xhr = new XMLHttpRequest();

  window.load = function(callback, URL) {
    var xhrLoadListener = function () {
      callback(xhr);
      xhr.removeEventListener('load', xhrLoadListener);
    };
    xhr.addEventListener('load', xhrLoadListener);
    xhr.responseType = 'json';
    xhr.open('GET', URL);
    xhr.send();
  }
})();