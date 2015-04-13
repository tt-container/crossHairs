// CLIENT SIDE APPLICATION

(function () {
	// Wait, until the browser is finished loading.
	$(function () {
		var canvas = document.getElementById('my-first-canvas'),
			setupCanvas,
			mainPath,
			drawLine,
			scaleLine,
			sliderUpdated,
			requestNewPosition,
			operationMode = 'server', // Change this to "server" when Node Server is running.
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
			mainPath.lineTo(startPoint.add([200, -100]));
		};

		moveLine = function (xCor) {
			mainPath.position = new paper.Point(xCor, 100);
		};

		requestNewPosition = function (value) {
			if (operationMode == 'static') {
				moveLine(value * 100);
			} else if (operationMode == 'server') {	
				$.get('/slider-test/' + value, {}, function (response) {
					moveLine(Number(response));
				});
			} else {
				throw new Error('Invalid operation mode!');
			}
		};

		sliderUpdated = function (event, ui) {
			requestNewPosition(ui.value);
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