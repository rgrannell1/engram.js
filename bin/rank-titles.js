#!/usr/bin/env node
"use strict";

var doc = "\nUsage:\n    rank\n    rank summarise\n    rank clear\n";

var $ = require("jquery");
var fs = require("fs");
var docopt = require("docopt").docopt;
var colors = require("colors");

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

algorithms["trim-delimiter"] = function (uri, title) {

	var delimiter = /[ \t]+[|\-—»][ \t]+[^|\-—»]+$/g;

	return title.replace(delimiter, "");
};

algorithms["trim-pipe"] = function (uri, title) {
	return title.split(/[ \t]*[|][^|]+/g).join("");
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

		var results = Object.keys(algorithmTitles[url]).map(function (algorithm) {
			return {
				algorithm: algorithm,
				title: algorithmTitles[url][algorithm]
			};
		});

		var duplicates = true;

		// -- obviously a bad algorithm; doesn't matter here.
		for (var ith = 0; ith < results.length; ++ith) {
			for (var jth = 0; jth < results.length; ++jth) {

				var isSame = results[ith].title === results[jth].title;
				duplicates = duplicates && isSame;
			}
		}

		if (!duplicates) {

			return results.map(function (result) {
				return colors.green("" + result.algorithm + ": " + result.title);
			}).join("\n");
		} else {

			return results.map(function (result) {
				return "" + result.algorithm + ": " + result.title;
			}).join("\n");
		}
	}).join("\n\n");

	console.log(result);
};