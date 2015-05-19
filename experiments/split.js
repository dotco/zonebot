var fs = require('fs');

function initData(fn) {
	var data = {};
	fs.readFileSync(fn, 'utf-8').split('\n').forEach(function(line) {
		line[data] = true;
	});
}

function main() {
	var data = initData('../data/domains-only.txt');
}

main();
