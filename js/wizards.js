'use strict';

(function() {

	window.wizards = {
		coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
		eyeColors: ['black', 'red', 'blue', 'yellow', 'green'],
		fireballColors: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],

		/**
		 * @description Обновляет сортированных волшебников
		 */
		updateWizards: function() {
			sortWizards();
			renderWizards();
		}
	};

	var setup = document.querySelector('.setup'),
			URL = 'https://js.dump.academy/code-and-magick/data',

		similarList = document.querySelector('.setup-similar-list'),
		similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item'),

		WIZARDS_COUNT = 4,
		wizards = [],
		
		wizardsLoadHandler = function (xhr) {
			if (xhr.response) {
				wizards = xhr.response;				
			}
			window.wizards.updateWizards();
		};
	
	// Загружаем похожих персонажей с сервера
	window.load(wizardsLoadHandler, URL);

	
	/**
	 * @description Задаем параметр "похожести" волшебника
	 */
	function setSimilarity() {
		wizards.forEach(function(wizard) {
			 wizard.similarity = 0;

				//  Если одинаковая мантия, то +2 к парамеру схожести
			 if (wizard.colorCoat === document.querySelector('input[name=coat-color]').value) {
				 wizard.similarity += 2;
			 }

			 //  Если одинаковые глаза, то +1 к парамеру схожести
			 if (wizard.colorEyes === document.querySelector('input[name=eyes-color]').value) {
				 wizard.similarity++;
			 }
		});
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
		wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].colorCoat;

		// Цвет глаз
		wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].colorEyes;
		return wizardElement;
	}

	/**
	 * @description Сортирует волшебников по похожести
	 */
	function sortWizards() {
		setSimilarity();
		wizards.sort(function (first, second) {
			return second.similarity - first.similarity;
		});
	}

	/**
	 * @description Вывод DOM-нод волшебников в окно
	 */
	function renderWizards() {

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
	}

})();