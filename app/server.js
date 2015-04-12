(function () {
	'use strict';

	var express = require('express'),
		path = require('path'),
		server = express(),
		listeningInterface,
		staticOptions = {
			root: __dirname +'/html/',
			dotfiles: 'deny'
		};

	server.use(express.static(path.join(__dirname, 'static')));

	server.get('/', function (request, response) {
		// Send the HTML for the interface
		response.sendFile('index.html', staticOptions, function (err) {
			if (err) {
				console.log(err);
				console.log('failed to send file');
			}
		});
	});

	server.get('/slider-test/:sliderval', function (request, response) {
		var value = Number(request.params.sliderval);
		value = value * 100;
		response.send(value.toString());
	});

	server.get('/crosshair/:x/:y', function (request, response) {
		response.send(
			'You sent me: X-cor: ' + request.params.x + ' and Y-cor: ' + request.params.y);
	});

	listeningInterface = server.listen(3000, function () {
		console.log('Server is listening...');
	});

}());