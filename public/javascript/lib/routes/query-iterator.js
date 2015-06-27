"use strict";

var parseResource = function (raw) {

	var parts = {};

	if (raw.indexOf("#") !== -1) {

		parts.hash = raw.slice(raw.indexOf("#") + 1);
		raw = raw.slice(0, raw.indexOf("#"));

		if (raw.indexOf("?") !== -1) {

			var queryString = raw.slice(raw.indexOf("?") + 1);
			raw = raw.slice(0, raw.indexOf("?"));

			parts.params = queryString.split("&").map(function (pairs) {
				return pairs.split("=");
			});
		}
	}

	parts.paths = raw.split("/").filter(function (part) {
		return part.length > 0;
	});

	return parts;
};

var QueryIterator = function QueryIterator(raw) {
	var _this = this;

	var self = {};

	this.data = parseResource(raw);

	this.peekNextPath = function () {

		var isEmpty = is.undefined(_this.data.paths) || _this.data.paths.length === 0;

		if (!isEmpty) {
			return _this.data.paths[0];
		}
	};

	this.getNextPath = function () {

		var result = _this.peekNextPath();

		if (!is.undefined(result)) {
			_this.data.paths.shift();
		}

		return result;
	};

	this.peekNextPaths = function () {

		var isEmpty = is.undefined(_this.data.paths) || _this.data.paths.length === 0;

		if (!isEmpty) {
			return "/" + _this.data.paths.join("/");
		}
	};

	this.getNextPaths = function () {

		var result = _this.peekNextPaths();
		_this.data.paths = undefined;

		return result;
	};

	this.peekNextHash = function () {

		if (!is.undefined(_this.data.hash)) {
			return "#" + _this.data.hash;
		}
	};

	this.getNextHash = function () {

		var result = _this.peekNextHash();
		_this.data.hash = undefined;

		return result;
	};

	this.peekNextParams = function () {

		var isEmpty = is.undefined(_this.data.params) || _this.data.params.length === 0;

		if (!isEmpty) {

			return "?" + _this.data.params.map(function (pair) {
				return pair.join("=");
			}).join("&");
		}
	};

	this.getNextParams = function () {

		var params = _this.peekNextParams();
		_this.data.params = undefined;

		return params;
	};

	this.peekNextParam = function () {

		var isEmpty = is.undefined(_this.data.params) || _this.data.params.length === 0;

		if (!isEmpty) {
			return _this.data.params[0];
		}
	};

	this.getNextParam = function () {

		var result = _this.peekNextParam();

		var isEmpty = is.undefined(_this.data.params) || _this.data.params.length === 0;

		if (!isEmpty) {
			_this.data.params.shift();
		}

		return result;
	};

	this.peekRest = function () {

		return [_this.peekNextPaths(), _this.peekNextParams(), _this.peekNextHash()].filter(function (part) {
			return part.length > 0;
		}).join("");
	};

	this.getRest = function () {

		var result = _this.peekRest();["hash", "paths", "params"].forEach(function (key) {
			_this.data[key] = undefined;
		});

		return result;
	};

	return this;
};

QueryIterator.fromQueryIterator = function (iterator) {

	var raw = [iterator.peekNextPaths(), iterator.peekNextParams(), iterator.peekNextHash()].filter(function (part) {
		return part && part.length > 0;
	}).join("");

	return new QueryIterator(raw);
};

QueryIterator.fromLocation = function (location) {

	var raw = [location.pathname, location.search, location.hash].filter(function (part) {
		return part.length > 0;
	}).join("");

	return new QueryIterator(raw);
};