"use strict";

var use = {};

use.location = {

	isMatch: true,
	where: {
		path: function (condition) {

			use.location.parts.push({
				method: "getNextPath",
				condition: condition
			});

			return use.location;
		},
		paths: function (condition) {

			use.location.parts.push({
				method: "getNextPaths",
				condition: condition
			});

			return use.location;
		},
		hash: function (condition) {

			use.location.parts.push({
				method: "getNextHash",
				condition: condition
			});

			return use.location;
		},
		params: function (condition) {

			use.location.parts.push({
				method: "getNextParams",
				condition: condition
			});

			return use.location;
		},
		param: function (condition) {

			use.location.parts.push({
				method: "getNextParam",
				condition: condition
			});

			return use.location;
		},
		rest: function (condition) {

			use.location.parts.push({
				method: "getRest",
				condition: condition
			});

			return use.location;
		}
	},
	parts: [],
	compile: function compile(debug) {
		var _this = this;

		return function (location) {

			var iterator = new QueryIterator.fromLocation(location);

			for (var ith = 0; ith < _this.parts.length; ++ith) {

				// -- for every matched part
				var part = _this.parts[ith];

				var method = part.method;
				var condition = part.condition;

				var clone = QueryIterator.fromQueryIterator(iterator);
				var value = iterator[method]();

				if (is.undefined(value)) {
					// -- that part doesn't exist, so can never be matched.
					return false;
				} else {
					// -- test the match

					var isMatch = isPartMatch(condition, clone, value);

					if (!isMatch) {
						return false;
					}
				}
			}

			return true;
		};
	}

};

var isPartMatch = function (condition, clone, part) {

	if (is["function"](condition)) {

		var wrapped = function () {
			return condition.call(clone, part, clone);
		};
	} else if (is.string(condition)) {

		var wrapped = function () {
			return condition === part;
		};
	} else if (is.regexp(condition)) {

		var wrapped = function () {
			return condition.test(part);
		};
	} else {
		throw TypeError("unimplemented");
	}

	return wrapped();
};