"use strict";

var use = {};

var where = {
	path: function (predicate) {

		var isMatch = predicate(undefined.query.getNextPath());
		undefined.isMatch = undefined.isMatch && isMatch;

		return undefined;
	}
};

use.location = function (location) {

	return {
		isMatch: true,
		query: new QueryIterator.fromLocation(location),
		where: where
	};
};