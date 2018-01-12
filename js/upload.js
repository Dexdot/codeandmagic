'use strict';

(function() {
  var xhr = new XMLHttpRequest();

  window.upload = function(URL, data, callback) {
    xhr.addEventListener('load', function () {
        callback(xhr);
    });
    xhr.addEventListener('timeout', function () {
        alert('Время ответа сервера вышло.');
    });
    xhr.timeout = 30000;
    xhr.responseType = 'json';
    xhr.open('POST', URL);
    xhr.send(data);
  }
})();