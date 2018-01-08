'use strict';

var setup = document.querySelector('.setup'),
		setupOpen = document.querySelector('.setup-open'),
		setupOpenIcon = setupOpen.querySelector('.setup-open-icon'),
		setupClose = setup.querySelector('.setup-close'),
		setupHandle = setup.querySelector('.upload'),

		setupInput = setup.querySelector('.setup-user-name'),
		setupSubmit = setup.querySelector('.setup-submit'),

		artifacts = setup.querySelector('.setup-artifacts'),
		shop = setup.querySelector('.setup-artifacts-shop'),
		draggedItem = null,

		similarList = document.querySelector('.setup-similar-list'),
		similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item'),

		wizardCoat = setup.querySelector('.wizard-coat'),
		wizardEyes = setup.querySelector('.wizard-eyes'),
		fireball = setup.querySelector('.setup-fireball-wrap'),
		fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],

		wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
		wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
		wizardCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
		wizardEyeColors = ['black', 'red', 'blue', 'yellow', 'green'],

		WIZARDS_COUNT = 4,
		ENTER_KEYCODE = 13,
		ESC_KEYCODE = 27,
		wizards = [],
		popupEscHandler = function (e) {
			if (e.keyCode === ESC_KEYCODE && !(document.activeElement.className === 'setup-user-name')) {
				closePopup();
			}
		},
		openPopup = function() {
			setup.classList.remove('hidden');
			document.addEventListener('keydown', popupEscHandler);
		},
		closePopup = function() {
			setup.classList.add('hidden');
			document.removeEventListener('keydown', popupEscHandler);
		},
		wizardCoatClickHandler = function() {
			changeFill(wizardCoat, wizardCoatColors);
		},
		wizardEyesClickHandler = function() {
			changeFill(wizardEyes, wizardEyeColors);
		},
		fireballClickHandler = function() {
			changeColor(fireball, fireballColors);
		},
		setupHandleMousedownHandler = function (e) {
			e.preventDefault();

			// Записываем стартовые координаты
			var startCoords = {
				x: e.clientX,
				y: e.clientY
			}

			// Обработчик перемещения
			var setupMousemoveHandle = function (moveEvent) {
				moveEvent.preventDefault();

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
			}

			// При нажатии добавляем обработчики перемещения и отжатия
			document.addEventListener('mousemove', setupMousemoveHandle);
			document.addEventListener('mouseup', setupMouseupHandle);
		},
		shopDragstartHandler = function (e) {

			// Если элемент, который начали перетаскивать внутри шопа является картинкой, то сохраняем его в draggedItem
			if (e.target.tagName.toLowerCase() === 'img') {
				draggedItem = e.target;
				e.dataTransfer.setData('text/plain', draggedItem.alt);
			}
		},
		artifactsDragoverHandler = function (e) {

			// По ум. запрещено перетаскивать что и куда попало, поэтому отменяем
			e.preventDefault();
			return false;
		},
		artifactsDropHandler = function (e) {

			// Когда дропаем в ячейку элемент, то убираем желтый фон и добавляем в него перетаскиваемый элемент (draggedItem)
			e.target.style.backgroundColor = '';
			e.target.appendChild(draggedItem);

			// Если хотим делать копии из шопа
			// e.target.appendChild(draggedItem.cloneNode(true));
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


// Обработчики на изменение внешнего вида персонажа
wizardCoat.addEventListener('click', wizardCoatClickHandler);
wizardEyes.addEventListener('click', wizardEyesClickHandler);
fireball.addEventListener('click', fireballClickHandler);

// Обработчики открытия/закрытия окна с персонажем
setupOpen.addEventListener('click', openPopup);
setupClose.addEventListener('click', closePopup);
setupOpenIcon.addEventListener('keydown', function(e) {
	if (e.keyCode === ENTER_KEYCODE) {
		openPopup();
	}
});
setupClose.addEventListener('keydown', function(e) {
	if (e.keyCode === ENTER_KEYCODE) {
		closePopup();
	}
});

// Обработчик перетаскивания окна с персонажем (Drag)
setupHandle.addEventListener('mousedown', setupHandleMousedownHandler);
setupHandle.addEventListener('click', function (e) {
	e.preventDefault();
});

// Обработчик, запоминающий перетаскиваемый элемент
shop.addEventListener('dragstart', shopDragstartHandler);

// Обработчики drag'n'drop для "ранца" персонажа
artifacts.addEventListener('dragover', artifactsDragoverHandler);
artifacts.addEventListener('drop', artifactsDropHandler);
artifacts.addEventListener('dragenter', artifactsDragenterHandler);
artifacts.addEventListener('dragleave', artifactsDragleaveHandler);


// Заполняем массив с персонажами
for (var i = 0; i < WIZARDS_COUNT; i++) {
	wizards.push(new Wizard);
}

// Создаем фрагмент и добавляем в него персонажей
var fragment = document.createDocumentFragment();
for (var i = 0; i < WIZARDS_COUNT; i++) {
	fragment.appendChild(renderWizard(i));
}

// Выводим фрагмент с похожими персонажами
similarList.innerHTML = '';
similarList.appendChild(fragment);

// Показываем окно с похожими персонажами
document.querySelector('.setup-similar').classList.remove('hidden');

/**
 * Представляет персонажа
 * @constructor
 * @param {string} name - Имя персонажа
 * @param {string} coatColor - Цвет мантии персо	нажа
 * @param {string} eyeColor - Цвет глаз персонажа
 */
function Wizard(name, coatColor, eyeColor) {
	this.name = getRandomElement(wizardNames) + ' ' + getRandomElement(wizardSurnames);
	this.coatColor = getRandomElement(wizardCoatColors);
	this.eyeColor = getRandomElement(wizardEyeColors);
}

/**
 * @description Создает копию шаблона персонажа, заполняет его данными из массивов и возвращает
 * @param {number} i Индекс объекта в массиве wizards
 * @return {element} wizardElement DOM-нода с генерированными цветами и именем
 */
function renderWizard(i) {

	// Копия шаблона
	var wizardElement = similarWizardTemplate.cloneNode(true);

	// Имя
	wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;

	// Цвет мантии
	wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;

	// Цвет глаз
	wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyeColor;
	return wizardElement;
}

/**
 * @description Задает случайный цвет из массива arr для элемента elem
 * @param {element} elem Элемент, которому изменится цвет
 * @param {array} arr Массив с кодами цветов
 */
function changeFill(elem, arr) {
	elem.style.fill = getRandomElement(arr);

}

/**
 * @description Задает случайный цвет фона из массива arr для элемента elem
 * @param {element} elem Элемент, которому изменится цвет фона
 * @param {array} arr Массив с кодами цветов
 */
function changeColor(elem, arr) {
	elem.style.background = getRandomElement(arr);
}

/**
 * @description Возвращает случайный элемент массива
 * @param {array} arr Массив
 * @return {arr[random]}
 */
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
