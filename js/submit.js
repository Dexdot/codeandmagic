'use strict';

(function() {
  var form = document.querySelector('.setup-wizard-form'),
      setup = document.querySelector('.setup'),
      URL = 'https://js.dump.academy/code-and-magick',
      STATUS_OK = 200,

      // Передаем статус ответа
      formSubmitHandler = function(xhr) {
        showMessage(xhr.status);
      }

  form.addEventListener('submit', function(e) {
    window.upload(URL, new FormData(form), formSubmitHandler);
    e.preventDefault();
  })

  function showMessage(status) {
    if (status === STATUS_OK) {
      alert('Сохранено!');
    } else {
      alert('Произошла ошибка, попробуйте снова');
    }
  }
})();