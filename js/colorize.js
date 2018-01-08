(function() {
  'use strict';

  var wizardCoat = document.querySelector('.wizard-coat'),
      wizardEyes = document.querySelector('.wizard-eyes'),
      fireball = document.querySelector('.setup-fireball-wrap'),

      // Меняем цвет мантии по клику
      wizardCoatClickHandler = function () {
        changeFill(wizardCoat, window.wizards.coatColors);
      },

      // Меняем цвет глаз по клику
      wizardEyesClickHandler = function () {
        changeFill(wizardEyes, window.wizards.eyeColors);
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