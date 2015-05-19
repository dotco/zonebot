#!/usr/bin/env node
var fs = require('fs'),
		lineReader = require('line-reader');

function initData(inFile) {
	var domains = {}, parts, domain;
	lineReader.eachLine(inFile, function(line, last) {
		if (last) {
			console.log(JSON.stringify(domains));
			return;
		}

		parts = line.split(/\s|\t|\|/);
		if (parts[0].match(/\.co\.?$/i))
			domain = parts[0]
		else if (parts.length >= 2 && parts[1].match(/\.co\.?$/i))
			domain = parts[1]
		else
			return;

		// strip everything except the name itself;
		// remove .co
		// remove trailing . (this is a zone file after all)
		domain = domain.replace(/\.co\.?$/i, '').toLowerCase();
		domains[domain] = 1;
	});
}

function init() {
	initData('/dev/stdin');
}

init();

