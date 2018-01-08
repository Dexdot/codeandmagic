(function () {
  'use strict';

  var setup = document.querySelector('.setup'),
      setupOpen = document.querySelector('.setup-open'),
      setupOpenIcon = setupOpen.querySelector('.setup-open-icon'),
      setupClose = setup.querySelector('.setup-close'),

      // Изначальная позиция окна
      setupCoords = {
        x: 50,
        y: 80
      },

      // Открыть окно
      openPopup = function () {
        setup.style.left = setupCoords.x + '%';
        setup.style.top = setupCoords.y + 'px';
        setup.classList.remove('hidden');
        document.addEventListener('keydown', popupEscHandler);
      },

      // Закрыть окно
      closePopup = function () {
        setup.classList.add('hidden');
        document.removeEventListener('keydown', popupEscHandler);
        
      },
      // Если нажали Esc и поле с именем персонажа не активно, то закрываем окно с персонажем
      popupEscHandler = function (e) {
        if (window.util.IsEscPress(e) && !(document.activeElement.className === 'setup-user-name')) {
          closePopup();
        }
      }

  // Обработчики открытия/закрытия окна с персонажем
  setupOpen.addEventListener('click', openPopup);
  setupClose.addEventListener('click', closePopup);

  // Открытие на Enter
  setupOpenIcon.addEventListener('keydown', function (e) {
    if (window.util.IsEnterPress(e)) {
      openPopup();
    }
  });

  // Закрытие на Esc
  setupClose.addEventListener('keydown', function (e) {
    if (window.util.IsEnterPress(e)) {
      closePopup();
    }
  });
})();