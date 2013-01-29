var config = require('../config'),
		fs = require('fs'),
		http = require('http'),
		express = require('express'),
		app = express();

function initData(fn) {
	return JSON.parse(fs.readFileSync(fn));
}

function initExpress(httpPort, domainData) {
	app.configure(function(){
		app.set('port', process.env.PORT || httpPort);
		app.use(express.favicon());
		app.use(express.logger('dev'));
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(app.router);
	});
	app.configure('development', function(){
		app.use(express.errorHandler());
	});
	app.get('/mu-8313f9bf-9c03f615-cce7738e-86c841dd', function(req, res) {
		res.send('42');
	});
	app.get('/:name', function(req, res){
		var name = req.param('name').toLowerCase();
		if (name.substr(-3) === '.CO')
			name = name.substr(0, -3);
		console.log(name);
		if (name in domainData)
			res.send({ status: 'taken' });
		else
			res.send({ status: 'avail' });
	});
	http.createServer(app).listen(app.get('port'), function(){
		var nKeys = Object.keys(domainData).length;
		console.log("Express server listening on port " + app.get('port') + " for " + nKeys + " domains");
	});
}

function init() {
	if (process.argv.length != 3) {
		console.error('usage: node server.js [zonedata.json]');
		process.exit(1);
	}
	console.log('config', config);
	console.log('argv', process.argv);
	var data = initData(process.argv[2]);
	initExpress(config.httpPort, data);
}

init();

