#!/usr/bin/env node
"use strict";

var doc = "\nUsage:\n    rank\n    rank summarise\n    rank clear\n";

var $ = require("jquery");
var fs = require("fs");
var docopt = require("docopt").docopt;
var prompt = require("prompt");

var args = docopt(doc);

var URL = require("url");

var algorithms = {};

algorithms["trim-end"] = function (uri, title) {

	var url = URL.parse(uri);

	// -- remove the .com
	var hostname = url.hostname.split(".").slice(0, -1).join(".");

	var regex = new RegExp("(.+):?([ \t].[ \t]" + hostname + "):?", "i");
	return title.replace(regex, "$1");
};

fs.readFile("data/data-bookmarks.json", "utf8", function (err, data) {

	if (err) {
		throw err;
	}

	var pairs = JSON.parse(data);

	surveyResults(processTitles(algorithms, pairs), function (err, data) {});
});

var processTitles = function processTitles(algorithms, pairs) {

	var out = {};

	pairs.forEach(function (_ref) {
		var url = _ref.url;
		var title = _ref.title;

		out[url] = {};

		Object.keys(algorithms).forEach(function (name) {
			out[url][name] = algorithms[name](url, title);
		});

		out[url].IDENTITY = title;
	});

	return out;
};

var surveyResults = function surveyResults(algorithmTitles) {
	// -- print to the screen.

	var result = Object.keys(algorithmTitles).map(function (url) {
		return Object.keys(algorithmTitles[url]).map(function (algorithm) {
			return "" + algorithm + ": " + algorithmTitles[url][algorithm];
		});
	}).join("\n");

	console.log(result);
};