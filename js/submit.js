'use strict';

(function() {
  var form = document.querySelector('.setup-wizard-form'),
      setup = document.querySelector('.setup'),
      URL = 'https://js.dump.academy/code-and-magick',

      // Передаем статус ответа
      formSubmitHandler = function(xhr) {
        showMessage(xhr.status);
      }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    window.upload(URL, new FormData(form), formSubmitHandler);
  })

  function showMessage(status) {
    if (status === window.util.STATUS_OK) {
      alert('Сохранено!');
    } else {
      alert('Произошла ошибка, попробуйте снова');
    }
  }
})();