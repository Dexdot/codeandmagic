(function() {
  'use strict';
      // Окно с персонажем
  var setup = document.querySelector('.setup'),

      // Элемент, за который можно перетаскивать окно с персонажем
      setupHandle = setup.querySelector('.upload'),
      setupHandleMousedownHandler = function (e) {
        e.preventDefault();

        // Записываем стартовые координаты
        var startCoords = {
          x: e.clientX,
          y: e.clientY
        },

        // Флаг - окно не перемещено
        dragged = false;
        
        // Обработчик перемещения
        var setupMousemoveHandle = function (moveEvent) {
          moveEvent.preventDefault();

          // Флаг - окно перемещено (т.к. mousemove)
          dragged = true;

          // Записываем смещение (стартовые - текущие)
          var shift = {
            x: startCoords.x - moveEvent.clientX,
            y: startCoords.y - moveEvent.clientY
          }

          // Перезаписываем стартовые (т.к. элемент переместили)
          startCoords = {
            x: moveEvent.clientX,
            y: moveEvent.clientY
          }

          // Задаем окну координаты
          setup.style.top = setup.offsetTop - shift.y + 'px';
          setup.style.left = setup.offsetLeft - shift.x + 'px';

        }

        // После отжатия кнопки мыши, удаляем обработчики перемещения и отжатия
        var setupMouseupHandle = function (mouseupEvent) {
          mouseupEvent.preventDefault();
          document.removeEventListener('mousemove', setupMousemoveHandle);
          document.removeEventListener('mouseup', setupMouseupHandle);

          // Если окно было перемещено, то отменяем загрузку файла (аватара)
          if (dragged) {
            var setupHandleClickHandler = function(e) {
              e.preventDefault();
              dragged = false;
              setupHandle.removeEventListener('click', setupHandleClickHandler);
            }
            setupHandle.addEventListener('click', setupHandleClickHandler);
          }

        }

        // При нажатии добавляем обработчики перемещения и отжатия
        document.addEventListener('mousemove', setupMousemoveHandle);
        document.addEventListener('mouseup', setupMouseupHandle);
      }


  // Обработчик перетаскивания окна с персонажем (Drag)
  setupHandle.addEventListener('mousedown', setupHandleMousedownHandler);

})();