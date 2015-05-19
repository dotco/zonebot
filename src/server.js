var config = require('../config'),
		cluster = require('cluster'),
		fs = require('fs'),
		http = require('http'),
		os = require('os'),
		url = require('url'),
		taken = JSON.stringify(config.response.taken),
		avail = JSON.stringify(config.response.available),
		globalStats = {}, 
		nHits = 0,
		updateInterval = 5, // after n hits, send status
		showStatsInterval = config.statsUpdateSecs * 1000,
		domainData,
		lastTotal = 0;

function checkName(data) {

	return function(req, res) { 
		console.log(req.url)
		var parsed = url.parse(req.url, true),
				query = parsed.query;

		console.log(req.url, req.headers);

		res.writeHead(200, {'Content-Type': 'application/json'});

		if (req.url == '/mu-8313f9bf-9c03f615-cce7738e-86c841dd') {
			res.write('42');
			res.end();
			return;
		}

		var name = query.domain;
		if (!name) { 
			res.write('no ?domain=');
			res.end();
			return;
		}
		name = name.toLowerCase();
		if (name.substr(-3) === '.co')
			name = name.slice(0, -3);

		if (req.url.indexOf('/exclude') === 0) {
			data[name] = 1;
			res.write('excluded');
			res.end();
			return;
		}

		console.log(req.url, req.headers);
		
		// jsonp
		if (query.callback) 
			res.write(query.callback+'(');

		console.log('checking',name);

		if (name in data)
			res.write(taken);
		else
			res.write(avail);

		// jsonp
		if (query.callback)
			res.write(')');

		res.end();
		nHits++;
		if (nHits % updateInterval == 0) {
			// console.log('nHits for #'+ cluster.worker.id, nHits);
			process.send({ workerId: cluster.worker.id, hits: nHits });
		}
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
	console.log('worker '+cluster.worker.id+' listening on '+port);
}

function init() {
	var nCpus = 1; // os.cpus().length;

	if (process.argv.length != 3) {
		console.error('usage: node server.js [zonedata.json]');
		process.exit(1);
	}

	if (cluster.isMaster) {
		console.log('config', config);
		console.log('argv', process.argv);
		for (var i = 0; i < nCpus; i++) {
			var worker = cluster.fork();
			worker.on('message', updateStats);
		}

		cluster.on('exit', function(worker, code, signal) {
			console.log('worker '+worker.process.pid+' died');
			globalStats[worker.id] = 'dead';
		});

		setInterval(showStats, showStatsInterval);
	} else {
		domainData = initData(process.argv[2]);
		console.log('read', Object.keys(domainData).length, 'records from', process.argv[2]);
		process.send({ workerId: cluster.worker.id, hits: 0 });
		initExpress(config.httpPort, domainData);
	}
}

function showStats() {
	var workers = Object.keys(globalStats),
			nCpus = os.cpus().length, 
			parts = [],
			total = 0,
			perSec = 0;

	for (var i = 0; i < nCpus; i++) {
		parts.push('#'+i+': '+globalStats[workers[i]]);
		total += globalStats[workers[i]];
	}
	console.log(parts.join(', '));
	perSec = (total - lastTotal) / config.statsUpdateSecs;
	console.log("total = ", total, " per sec = ", perSec);
	lastTotal = total;
}

function updateStats(msg) {
	// console.log('updateStats', msg);
	if (msg.workerId)
		globalStats[msg.workerId] = msg.hits;
}

init();

