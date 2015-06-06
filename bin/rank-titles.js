#!/usr/bin/env node
"use strict";

var doc = "\nUsage:\n    rank\n\n";

var fs = require("fs");
var docopt = require("docopt").docopt;
var prompt = require("prompt");

var args = docopt(doc);

var algorithms = {};

algorithms.naive = function (uri, title) {
	return title;
};

var processTitles = function processTitles(algorithms, pairs) {

	return pairs.map(function (_ref) {
		var url = _ref.url;
		var title = _ref.title;

		var out = {};

		Object.keys(algorithms).forEach(function (name) {

			out[name] = {
				title: algorithms[name](url, title),
				url: url
			};
		});

		return out;
	});
};

var surveyResults = function surveyResults(titles, stored, callback) {};

fs.readFile("data/data-bookmarks-stored.json", "utf8", function (err, data) {

	var stored = err ? {} : JSON.parse(data);

	fs.readFile("data/data-bookmarks.json", "utf8", function (err, data) {

		if (err) {
			throw err;
		}

		var pairs = JSON.parse(data);

		surveyResults(processTitles(algorithms, pairs), stored, function (err, data) {

			console.log(data);
		});
	});
});