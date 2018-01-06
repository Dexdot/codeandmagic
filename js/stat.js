'use strict';

window.renderStatistics = function(ctx, names, times) {
	var CANVAS_WIDTH = 420,
			CANVAS_HEIGHT = 270,
			CANVAS_X = 100,
			CANVAS_Y = 10,
			CANVAS_SHADOW_X = CANVAS_X + 10,
			CANVAS_SHADOW_Y = CANVAS_Y + 10,
			CANVAS_PADDING_X = CANVAS_X + 20,
			CANVAS_PADDING_Y = CANVAS_Y + 20;

	// Рисуем тень
	ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
	ctx.fillRect(CANVAS_SHADOW_X, CANVAS_SHADOW_Y, CANVAS_WIDTH, CANVAS_HEIGHT);

	// Рисуем плашку
	ctx.fillStyle = '#fff';
	ctx.fillRect(CANVAS_X, CANVAS_Y, CANVAS_WIDTH, CANVAS_HEIGHT);

	// Выводим текст "Ура, вы победили!"
	ctx.fillStyle = '#000';
	ctx.font = '16px PT Mono';
	ctx.textBaseline = 'hanging';
	ctx.fillText('Ура, вы победили!\n', CANVAS_PADDING_X, CANVAS_PADDING_Y);

	// Округляем массив, находим макс элемент и его индекс
	roundArray(times);
	var max = getMaxElement(times),
			maxIndex = getMaxElementIndex(times);

	// Находим индекс игрока "Вы"
	var myHistogramIndex = names.indexOf('Вы');

	// Выводим текст
	ctx.fillText('Худшее время ' + max + ' мс у игрока ' + names[maxIndex], CANVAS_PADDING_X, 50);
	ctx.fillText('Список результатов:', CANVAS_PADDING_X, 70);

	// Задаем параметры гистограмм
	var gutter = 50,
			histogramWidth = 40,
			histogramX = 50,
			histogramHeight;

	// Рисуем гистограммы
	for (var i = 0; i < times.length; i++) {

		// Находим высоту гистограммы пропорционально времени
		histogramHeight = 150 * times[i] / max;

		// Отступ для первой гистограммы
		if (!i) {
			histogramX = 30;
		}

		// Задаем цвета гистограммам, для игрока Вы - красный цвет, для остальных синий со случайной прозрачностью
		if (i === myHistogramIndex) {
			ctx.fillStyle = 'rgba(255, 0, 0, 1)';
		} else {
		ctx.fillStyle = 'rgba(0, 0, 255, ' + getRandomMinMax(1, 0.3) + ')';
		}

		// Выводим гистограмму
		ctx.fillRect(histogramX + histogramWidth + gutter, 110, histogramWidth, histogramHeight);

		// Выводим имя игрока, время
		ctx.fillText(names[i], histogramX + histogramWidth + gutter, histogramWidth + gutter);
		ctx.fillText(times[i] + ' мс', histogramX + histogramWidth + gutter, CANVAS_HEIGHT - 5);

		// Позиционируем следующую гистограмму
		histogramX += histogramWidth + gutter;
	}

	/**
	 * @description Возвращает случайное число от min до max
	 * @param {number} max Максимальное число
	 * @param {number} min Минимальное число
	 * @return {number}
	 */
	function getRandomMinMax(max, min) {
		return (Math.random() * (max - min) + min);
	}

	/**
	 * @description Округляет числовой массив
	 * @param {array} arr Массив с числами
	 */
	function roundArray(arr) {
		for (var i = 0; i < arr.length; i++) {
			arr[i] = Math.round(arr[i]);
		}
	}

	/**
	 * @description Возвращает максимальный элемент массива
	 * @param {array} arr Массив с числами
	 * @return {number} max Максимальный элемет массива
	 */
	function getMaxElement(arr) {
		var max = 0;
		for (var i = 0; i < times.length; i++) {
			if (arr[i] > max) {
				max = arr[i];
			}
		}
		return max;
	}

	/**
	 * @description Возвращает индекс максимального элемента массива
	 * @param {array} arr Массив с числами
	 * @return {number} maxElementIndex Индекс максимального элемента массива
	 */
	function getMaxElementIndex(arr) {
		var max = 0,
				maxElementIndex;
		for (var i = 0; i < times.length; i++) {
			maxElementIndex = 0;
			if (arr[i] > max) {
				max = arr[i];
				maxElementIndex = i;
			}
		}
		return maxElementIndex;
	}
}
