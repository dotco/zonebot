var fs = require('fs');

function initData(fn) {
	return JSON.parse(fs.readFileSync(fn, 'utf-8'));
}

function main() {
	var data = initData('../data/domains-only.json');
}

main();
