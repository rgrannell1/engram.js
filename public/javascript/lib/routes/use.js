"use strict";

var use = {};

use.location = {

	isMatch: true,
	where: {
		path: function (predicate) {

			use.location.parts.push({
				method: "getNextPath",
				predicate: predicate
			});

			return use.location;
		},
		paths: function (predicate) {

			use.location.parts.push({
				method: "getNextPaths",
				predicate: predicate
			});

			return use.location;
		},
		hash: function (predicate) {

			use.location.parts.push({
				method: "getNextHash",
				predicate: predicate
			});

			return use.location;
		},
		params: function (predicate) {

			use.location.parts.push({
				method: "getNextParams",
				predicate: predicate
			});

			return use.location;
		},
		param: function (predicate) {

			use.location.parts.push({
				method: "getNextParam",
				predicate: predicate
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
				var predicate = part.predicate;

				var clone = QueryIterator.fromQueryIterator(iterator);
				var value = iterator[method]();

				if (is.undefined(value)) {
					return false;
				} else {

					var isMatch = predicate.call(clone, value, clone);

					if (!isMatch) {
						return false;
					}
				}
			}

			return true;
		};
	}

};