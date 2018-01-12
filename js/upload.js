'use strict';

(function() {
  var xhr = new XMLHttpRequest();

  window.upload = function(URL, data, callback) {
    var xhrLoadHandler = function () {
      callback(xhr);
      xhr.removeEventListener('load', xhrLoadHandler);
    };
    xhr.addEventListener('load', xhrLoadHandler);
    xhr.addEventListener('timeout', function () {
        alert('Время ответа сервера вышло.');
    });
    xhr.timeout = 30000;
    
    if (xhr.readyState !== window.util.STATE_LOADING && xhr.readyState !== window.util.STATE_DONE) {
      xhr.responseType = 'json';
    }
    xhr.open('POST', URL);
    xhr.send(data);
  }
})();