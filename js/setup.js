'use strict';

// Показываем окно с установкой персонажа
document.querySelector('.setup').classList.remove('hidden');

var WIZARDS_COUNT = 4;

var similarList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var wizardCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var wizardEyeColors = ['black', 'red', 'blue', 'yellow', 'green'];
var wizards = [];

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

// Конструктор персонажа
function Wizard(name, coatColor, eyeColor) {
	this.name = getRandomElement(wizardNames) + ' ' + getRandomElement(wizardSurnames),
	this.coatColor = getRandomElement(wizardCoatColors),
	this.eyeColor = getRandomElement(wizardEyeColors)
}
// Создает копию шаблона персонажа, заполняет его данными из массивов и возвращает
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
function getRandomElement(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}
