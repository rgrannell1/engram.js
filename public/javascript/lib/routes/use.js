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

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = _this.parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var part = _step.value;
					var method = part.method;
					var predicate = part.predicate;

					var clone = QueryIterator.copy(iterator);
					var value = iterator[method]();

					var isMatch = predicate(value, clone);

					if (!isMatch) {
						return false;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator["return"]) {
						_iterator["return"]();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return true;
		};
	}

};