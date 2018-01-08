(function() {
	'use strict';

	// Задаем параметры канваса
	var CANVAS_WIDTH = 420,
		CANVAS_HEIGHT = 270,
		CANVAS_X = 100,
		CANVAS_Y = 10,
		CANVAS_SHADOW_X = CANVAS_X + 10,
		CANVAS_SHADOW_Y = CANVAS_Y + 10,
		CANVAS_PADDING_X = CANVAS_X + 20,
		CANVAS_PADDING_Y = CANVAS_Y + 20,

		// Задаем параметры гистограмм
		gutter = 50,
		histogramWidth = 40,
		histogramX = 50,
		histogramHeight;

	// Экспорт функции для отрисовки статистики
	window.renderStatistics = function (ctx, names, times) {

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

		// Округляем элементы массива, находим макс элемент и его индекс
		window.util.roundArray(times);
		var max = window.util.getMaxElement(times),
			maxIndex = window.util.getMaxElementIndex(times),

			// Находим индекс игрока "Вы"
			myHistogramIndex = names.indexOf('Вы');

		// Выводим текст
		ctx.fillText('Худшее время ' + max + ' мс у игрока ' + names[maxIndex], CANVAS_PADDING_X, 50);
		ctx.fillText('Список результатов:', CANVAS_PADDING_X, 70);

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
				ctx.fillStyle = 'rgba(0, 0, 255, ' + window.util.getRandomMinMax(1, 0.3) + ')';
			}

			// Выводим гистограмму
			ctx.fillRect(histogramX + histogramWidth + gutter, 110, histogramWidth, histogramHeight);

			// Выводим имя игрока, время
			ctx.fillText(names[i], histogramX + histogramWidth + gutter, histogramWidth + gutter);
			ctx.fillText(times[i] + ' мс', histogramX + histogramWidth + gutter, CANVAS_HEIGHT - 5);

			// Позиционируем следующую гистограмму
			histogramX += histogramWidth + gutter;
		}
	}

})();