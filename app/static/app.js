(function () {
	// Wait, until the browser is finished loading.
	$(function () {
		var canvas = document.getElementById('my-first-canvas'),
			setupCanvas,
			mainPath,
			drawLine,
			scaleLine,
			sliderUpdated,
			init;

		setupCanvas = function () {
			paper.setup(canvas);
		};

		drawLine = function () {
			var startPoint;

			mainPath = new paper.Path();
			mainPath.strokeColor = 'black';

			startPoint = new paper.Point(100, 100);

			mainPath.moveTo(startPoint);
			mainPath.lineTo(startPoint.add([200, -50]));
		};

		moveLine = function (xCor) {
			mainPath.position = new paper.Point(xCor, 100);
		};

		sliderUpdated = function (event, ui) {
			$.get('/slider-test/' + ui.value, {}, function (response) {
				moveLine(Number(response));
			});
		};
		
		init = function () {
			setupCanvas();
			drawLine();

			$('#my-slider').slider({
				min: .05,
				max: .90,
				step: .01,
				slide: sliderUpdated
			});
		};

		init();
	});
}());