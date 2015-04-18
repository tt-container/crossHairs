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
			operationMode = 'static', // Change this to "server" when Node Server is running = or 'static'
			init;

		setupCanvas = function () {
			paper.setup(canvas);
		};

		drawLine = function () {
			var startPoint;

			mainPath = new paper.Path();
			mainPath.strokeColor = 'black';

			startPoint = new paper.Point(20, 20);

			mainPath.moveTo(startPoint);

			//mainPath.strokeColor = 'blue';
			mainPath.lineTo(startPoint + [20, -20]);

			
		};

		moveLine = function (xCor) {
			
			mainPath.position = new paper.Point(xCor, 10);
			mainPath.moveTo(mainPath.position);
			mainPath.lineTo(mainPath.position + [20, -50]); // new - EAS
		};

		requestNewPosition = function (value) {
			if (operationMode == 'static') {
				
				moveLine(value * 200);
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
				max: .95,
				step: .05,
				slide: sliderUpdated
			});
		};

		init();
	});
}());