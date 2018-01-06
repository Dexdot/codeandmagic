'use strict';

var setup = document.querySelector('.setup'),
		setupOpen = document.querySelector('.setup-open'),
		setupOpenIcon = setupOpen.querySelector('.setup-open-icon'),
		setupClose = setup.querySelector('.setup-close'),
		setupInput = setup.querySelector('.setup-user-name'),
		setupSubmit = setup.querySelector('.setup-submit'),
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
