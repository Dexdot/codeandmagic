'use strict';

(function() {
  var xhr = new XMLHttpRequest(),
      URL = 'https://js.dump.academy/code-and-magick/data';

  xhr.addEventListener('load', function() {
    console.log(xhr.response);
  })

  xhr.open('GET', URL);
  xhr.send();
})();