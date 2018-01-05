'use strict';

window.renderStatistics = function(ctx, names, times) {
	var CANVAS_WIDTH = 420;
	var CANVAS_HEIGHT = 270;
	var CANVAS_X = 100;
	var CANVAS_Y = 10;
	var CANVAS_SHADOW_X = CANVAS_X + 10;
	var CANVAS_SHADOW_Y = CANVAS_Y + 10;
	var CANVAS_PADDING_X = CANVAS_X + 20;
	var CANVAS_PADDING_Y = CANVAS_Y + 20;

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
	var max = getMaxElement(times);
	var maxIndex = getMaxElementIndex(times);

	// Находим индекс игрока "Вы"
	var myHistogramIndex = names.indexOf('Вы');

	// Выводим текст
	ctx.fillText('Худшее время ' + max + ' мс у игрока ' + names[maxIndex], CANVAS_PADDING_X, 50);
	ctx.fillText('Список результатов:', CANVAS_PADDING_X, 70);

	// Задаем параметры гистограмм
	var histogramHeight;
	var histogramWidth = 40;
	var histogramX = 50;
	var gutter = 50;

	// Рисуем гистограммы
	for (var i = 0; i < times.length; i++) {

		// Находим высоту гистограммы пропорционально времени
		histogramHeight = 150 * times[i] / max;

		// Отступ для первой гистограммы
		if (i === 0) {
			histogramX = 30;
		}

		// Задаем цвета гистограммам, для игрока Вы - красный цвет, для остальных синий со случайной прозрачностью
		if (i === myHistogramIndex) {
			ctx.fillStyle = 'rgba(255, 0, 0, 1)';
		} else {
		ctx.fillStyle = 'rgba(0, 0, 255, ' + getRandomOpacity(1, 0.3) + ')';
		}

		// Выводим гистограмму
		ctx.fillRect(histogramX + histogramWidth + gutter, 110, histogramWidth, histogramHeight);
		// Выводим имя игрока, время
		ctx.fillText(names[i], histogramX + histogramWidth + gutter, histogramWidth + gutter);
		ctx.fillText(times[i] + ' мс', histogramX + histogramWidth + gutter, CANVAS_HEIGHT - 5);

		// Позиционируем следующую гистограмму
		histogramX += histogramWidth + gutter;
	}
	// Объявляем функции
	function getRandomOpacity(max, min) {
		return (Math.random() * (max - min) + min);
	}
	function roundArray(arr) {
		for (var i = 0; i < arr.length; i++) {
			arr[i] = Math.round(arr[i]);
		}
		return max;
	}
	function getMaxElement(arr, max = 0) {
		for (var i = 0; i < times.length; i++) {
			if (arr[i] > max) {
				max = arr[i];
			}
		}
		return max;
	}
	function getMaxElementIndex(arr, max = 0) {
		for (var i = 0; i < times.length; i++) {
			var maxElementIndex = 0;
			if (arr[i] > max) {
				max = arr[i];
				maxElementIndex = i;
			}
		}
		return maxElementIndex;
	}
}