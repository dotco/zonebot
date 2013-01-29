var config = require('../config'),
		cluster = require('cluster'),
		fs = require('fs'),
		http = require('http'),
		url = require('url'),
		taken = JSON.stringify({ status: 'taken' }),
		avail = JSON.stringify({ status: 'avail' }),
		hitStats = {}, 
		nHits = 0,
		domainData;

function checkName(data) {

	return function(req, res) { 
		var path = url.parse(req.url).pathname.substr(1);
		
		res.writeHead(200, {'Content-Type': 'application/json'});
		var name = path.toLowerCase();
		if (name.substr(-3) === '.CO')
			name = name.substr(0, -3);
		// console.log(name);
		if (name in data)
			res.write(taken);
		else
			res.write(avail);
		res.end();
		nHits++;
		if (nHits % 100 == 0)
			console.log('nHits for #'+ cluster.worker.id, nHits);
	}
}

function initData(fn) {
	return JSON.parse(fs.readFileSync(fn));
}

function initExpress(httpPort, data) {
	var port = process.env.PORT || httpPort;
	/*
	http.createServer(app).listen(app.get('port'), function(){
		var nKeys = Object.keys(domainData).length;
		console.log("Express server listening on port " + app.get('port') + " for " + nKeys + " domains");
	});
	*/
	http.createServer(checkName(data)).listen(port);
	console.log('worker '+cluster.worker.id+' listening');
}

function init() {
	var nCpus = require('os').cpus().length;

	if (process.argv.length != 3) {
		console.error('usage: node server.js [zonedata.json]');
		process.exit(1);
	}

	if (cluster.isMaster) {
		console.log('config', config);
		console.log('argv', process.argv);
		for (var i = 0; i < nCpus; i++) {
			cluster.fork();
		}
		cluster.on('exit', function(worker, code, signal) {
			console.log('worker '+worker.process.pid+' died');
		});
	} else {
		domainData = initData(process.argv[2]);
		initExpress(config.httpPort, domainData);
	}

}

init();

