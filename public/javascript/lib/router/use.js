"use strict";

{
	var use;

	(function () {

		var parsePath = function (path) {

			var data = {};

			return data;
		};

		var SELECTORS = ["path", "paths", "dirname", "basename", "rawPaths", "rest", "hash", "rawQuery", "rawQueryParams", "rawQueryParam", "queryParams", "queryParam"];

		var buildSelector = function (selector) {
			return function (predicate) {
				return predicate.call(undefined, undefined.getNext(selector));
			};
		};

		var where = {};

		SELECTORS.forEach(function (selector) {
			where.selector = buildSelector(selector);
		});

		use = {};

		use.self = function (context) {};

		use.location = function (location) {};
	})();
}