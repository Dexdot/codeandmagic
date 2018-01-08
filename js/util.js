(function() {
  'use strict';

  var ESC_KEYCODE = 27,
      ENTER_KEYCODE = 13;

  window.util = {

    /**
     * @description Проверяет нажатие клавиши Esc
     * @param {Event} e Событие
     * @return {boolean}
     */
    IsEscPress: function(e) {
      if (e.keyCode === ESC_KEYCODE) {
        return true;
      }
      return false;
    },

    /**
     * @description Проверяет нажатие клавиши Enter
     * @param {Event} e Событие
     * @return {boolean}
     */
    IsEnterPress: function(e) {
      if (e.keyCode === ENTER_KEYCODE) {
        return true;
      }
      return false;
    },

    /**
     * @description Возвращает случайный элемент массива
     * @param {array} arr Массив
     * @return {arr[random]}
     */
    getRandomElement: function(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    
    /**
     * @description Возвращает случайное число от min до max
     * @param {number} max Максимальное число
     * @param {number} min Минимальное число
     * @return {number}
     */
    getRandomMinMax: function(max, min) {
      return (Math.random() * (max - min) + min);
    },

    /**
     * @description Округляет числовой массив
     * @param {array} arr Массив с числами
     */
    roundArray: function(arr) {
      for (var i = 0; i < arr.length; i++) {
        arr[i] = Math.round(arr[i]);
      }
    },

    /**
     * @description Возвращает максимальный элемент массива
     * @param {array} arr Массив с числами
     * @return {number} max Максимальный элемет массива
     */
    getMaxElement: function(arr) {
      var max = 0;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
          max = arr[i];
        }
      }
      return max;
    },

    /**
     * @description Возвращает индекс максимального элемента массива
     * @param {array} arr Массив с числами
     * @return {number} maxElementIndex Индекс максимального элемента массива
     */
    getMaxElementIndex: function(arr) {
      var max = 0,
        maxElementIndex = 0;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
          max = arr[i];
          maxElementIndex = i;
        }
      }
      return maxElementIndex;
    }

  }
})();