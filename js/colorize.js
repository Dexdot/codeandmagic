(function() {
  'use strict';

  var wizardCoat = document.querySelector('.wizard-coat'),
      wizardEyes = document.querySelector('.wizard-eyes'),
      fireball = document.querySelector('.setup-fireball-wrap'),
      prevTimer,

      // Меняем цвет мантии по клику
      wizardCoatClickHandler = function () {
        changeFill(wizardCoat, window.wizards.coatColors);
        document.querySelector('input[name=coat-color]').value = document.querySelector('.wizard-coat').style.fill;

        // Обновляем похожих персонажей с дебаунсем
        clearTimeout(prevTimer);
        prevTimer = setTimeout(function() {
          window.wizards.updateWizards();
        }, 300);
      },

      // Меняем цвет глаз по клику
      wizardEyesClickHandler = function () {
        changeFill(wizardEyes, window.wizards.eyeColors);
        document.querySelector('input[name=eyes-color]').value = document.querySelector('.wizard-eyes').style.fill;

        // Обновляем похожих персонажей с дебаунсем
        clearTimeout(prevTimer);
        prevTimer = setTimeout(function () {
          window.wizards.updateWizards();
        }, 300);        
      },

      // Меняем цвет фаербола по клику
      fireballClickHandler = function () {
        changeColor(fireball, window.wizards.fireballColors);
      }

  // Обработчики на изменение внешнего вида персонажа
  wizardCoat.addEventListener('click', wizardCoatClickHandler);
  wizardEyes.addEventListener('click', wizardEyesClickHandler);
  fireball.addEventListener('click', fireballClickHandler);

  /**
   * @description Задает случайную заливку из массива arr для элемента elem
   * @param {element} elem Элемент, которому изменится цвет
   * @param {array} arr Массив с кодами цветов
   */
  function changeFill(elem, arr) {
    elem.style.fill = window.util.getRandomElement(arr);
    
  }

  /**
   * @description Задает случайный цвет фона из массива arr для элемента elem
   * @param {element} elem Элемент, которому изменится цвет фона
   * @param {array} arr Массив с кодами цветов
   */
  function changeColor(elem, arr) {
    elem.style.background = window.util.getRandomElement(arr);
  }

})();