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
		}
	},
	parts: [],
	compile: function compile() {
		var _this = this;

		return function (location) {

			var iterator = new QueryIterator.fromLocation(location);

			for (var ith = 0; ith < _this.parts.length; ++ith) {

				var part = _this.parts[ith];

				var method = part.method;
				var condition = part.condition;

				var clone = QueryIterator.fromQueryIterator(iterator);
				var value = iterator[method]();

				if (is.undefined(value)) {
					return false;
				} else {

					var isMatch = testMatch(condition, clone, value);

					if (!isMatch) {
						return false;
					}
				}
			}

			return true;
		};
	}

};

var testMatch = function (condition, clone, value) {

	if (is["function"](condition)) {

		return condition.call(clone, value, clone);
	} else if (is.string(condition)) {

		var wrapped = function (part) {
			return condition === part;
		};

		return wrapped(value);
	} else if (is.regexp(condition)) {

		var wrapped = function (part) {
			return condition.test(part);
		};

		return wrapped(value);
	} else {

		throw TypeError("unimplemented");
	}
};