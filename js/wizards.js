(function() {
	'use strict';

	window.wizards = {
		coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
		eyeColors: ['black', 'red', 'blue', 'yellow', 'green'],
		fireballColors: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
	};

	var setup = document.querySelector('.setup'),

		similarList = document.querySelector('.setup-similar-list'),
		similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item'),

		wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
		wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],

		WIZARDS_COUNT = 4,
		wizards = [];

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
		this.name = window.util.getRandomElement(wizardNames) + ' ' + window.util.getRandomElement(wizardSurnames);
		this.coatColor = window.util.getRandomElement(window.wizards.coatColors);
		this.eyeColor = window.util.getRandomElement(window.wizards.eyeColors);
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
})();