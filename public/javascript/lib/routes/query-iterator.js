"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

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

var QueryIterator = (function () {
	function QueryIterator(raw) {
		_classCallCheck(this, QueryIterator);

		this.data = parseResource(raw);
	}

	_prototypeProperties(QueryIterator, {
		fromQueryIterator: {
			value: function fromQueryIterator(iterator) {

				var raw = [iterator.getNextPaths(), iterator.getNextParams(), iterator.getNextHash()].filter(function (part) {
					return part && part.length > 0;
				}).join("");

				return new QueryIterator(raw);
			},
			writable: true,
			configurable: true
		},
		fromLocation: {
			value: function fromLocation(location) {

				var raw = [location.pathname, location.search, location.hash].filter(function (part) {
					return part.length > 0;
				}).join("");

				return new QueryIterator(raw);
			},
			writable: true,
			configurable: true
		}
	}, {
		peekNextPath: {
			value: function peekNextPath() {

				var isEmpty = is.undefined(this.data.paths) || this.data.paths.length === 0;

				if (!isEmpty) {
					return this.data.paths[0];
				}
			},
			writable: true,
			configurable: true
		},
		getNextPath: {
			value: function getNextPath() {

				var result = this.peekNextPath();

				if (!is.undefined(result)) {
					this.data.paths.shift();
				}

				return result;
			},
			writable: true,
			configurable: true
		},
		peekNextPaths: {
			value: function peekNextPaths() {

				var isEmpty = is.undefined(this.data.paths) || this.data.paths.length === 0;

				if (!isEmpty) {
					return "/" + this.data.paths.join("/");
				}
			},
			writable: true,
			configurable: true
		},
		getNextPaths: {
			value: function getNextPaths() {

				var result = this.peekNextPaths();
				this.data.paths = undefined;

				return result;
			},
			writable: true,
			configurable: true
		},
		peekNextHash: {
			value: function peekNextHash() {

				if (!is.undefined(this.data.hash)) {
					return "#" + this.data.hash;
				}
			},
			writable: true,
			configurable: true
		},
		getNextHash: {
			value: function getNextHash() {

				var result = this.peekNextHash();
				this.data.hash = undefined;

				return result;
			},
			writable: true,
			configurable: true
		},
		peekNextParams: {
			value: function peekNextParams() {

				var isEmpty = is.undefined(this.data.params) || this.data.params.length === 0;

				if (!isEmpty) {

					return "?" + this.data.params.map(function (pair) {
						return pair.join("=");
					}).join("&");
				}
			},
			writable: true,
			configurable: true
		},
		getNextParams: {
			value: function getNextParams() {

				var params = this.peekNextParams();
				this.data.params = undefined;

				return params;
			},
			writable: true,
			configurable: true
		},
		peekNextParam: {
			value: function peekNextParam() {

				var isEmpty = is.undefined(this.data.params) || this.data.params.length === 0;

				if (!isEmpty) {
					return this.data.params[0];
				}
			},
			writable: true,
			configurable: true
		},
		getNextParam: {
			value: function getNextParam() {

				var result = this.peekNextParam();

				var isEmpty = is.undefined(this.data.params) || this.data.params.length === 0;

				if (!isEmpty) {
					this.data.params.shift();
				}

				return result;
			},
			writable: true,
			configurable: true
		},
		peekRest: {
			value: function peekRest() {

				var out = "";

				return [this.peekNextPaths(), this.peekNextParams(), this.peekNextHash()].filter(function (part) {
					return part.length > 0;
				}).join("");
			},
			writable: true,
			configurable: true
		},
		getRest: {
			value: function getRest() {

				var result = this.peekRest();

				this.data.hash = undefined;
				this.data.paths = undefined;
				this.data.params = undefined;

				return result;
			},
			writable: true,
			configurable: true
		}
	});

	return QueryIterator;
})();