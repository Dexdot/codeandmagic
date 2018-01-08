(function() {
  'use strict';

      // Контейнер ячеек персонажа
  var artifacts = document.querySelector('.setup-artifacts'),

      // Шоп с артефактами
      shop = document.querySelector('.setup-artifacts-shop'),

      // Контейнер, откуда будет перетаскиваться
      dragStartParentNode = null,

      // Артефакт, которую будут перетаскивать
      draggedItem = null,
      dragstartHandler = function (e) {

        // Если элемент, который начали перетаскивать внутри шопа является картинкой, то сохраняем его в draggedItem
        if (e.target.tagName.toLowerCase() === 'img') {
          draggedItem = e.target;
          e.dataTransfer.setData('text/plain', draggedItem.alt);
          addBorderArtifacts();
          dragStartParentNode = e.target.parentNode.parentNode;
        }
        
      },
      artifactsDragoverHandler = function (e) {

        // По ум. запрещено перетаскивать что и куда попало, поэтому отменяем
        e.preventDefault();
        return false;
      },
      artifactsDropHandler = function (e) {

        // Когда дропаем в ячейку элемент, то убираем желтый фон и убираем красную рамку для контейнера артефактов
        e.target.style.backgroundColor = '';
        removeBorderArtifacts();
        
        // Проверяем, что:
        // 1) В ячейке нет других нод
        // 2) Элемент, в который дропаем итем является ячейкой
        // 3) Перемещаем из шопа
        if (!e.target.children.length && e.target.className === 'setup-artifacts-cell' && dragStartParentNode.className === 'setup-artifacts-shop') {

          // Копируем итем
          e.target.appendChild(draggedItem.cloneNode(true));
        } else if (!e.target.children.length && e.target.className === 'setup-artifacts-cell') {

          // Перемещаем итем
          e.target.appendChild(draggedItem);
        }
        
        e.preventDefault();
      },
      artifactsDragenterHandler = function (e) {

        // Задаем желтый фон ячейке, на которую наводим перетаскиваемый элемент
        e.target.style.backgroundColor = 'yellow';
        
        e.preventDefault();
      },
      artifactsDragleaveHandler = function (e) {

        // Убираем желтый фон, уводя с ячейки перетаскиваемый элемент (draggedItem)
        e.target.style.backgroundColor = '';
        e.preventDefault();
      }



  shop.addEventListener('dragstart', dragstartHandler);
  shop.addEventListener('dragend', removeBorderArtifacts);
  
  artifacts.addEventListener('dragstart', dragstartHandler);
  artifacts.addEventListener('dragover', artifactsDragoverHandler);
  artifacts.addEventListener('drop', artifactsDropHandler);
  artifacts.addEventListener('dragenter', artifactsDragenterHandler);
  artifacts.addEventListener('dragleave', artifactsDragleaveHandler);
  
  /**
   * @description Добавляет красную рамку контейнеру с артефактами
   */
  function addBorderArtifacts() {
    artifacts.style.outline = '2px dashed red';
  }

  /**
   * @description Убирает красную рамку контейнеру с артефактами
   */
  function removeBorderArtifacts() {
    artifacts.style.outline = 'none';
  }

})();