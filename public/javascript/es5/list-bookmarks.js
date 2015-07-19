"use strict";

/*
	select a certain number of bookmarks starting before or after an ID.
*/

{
	var listDown;
	var listUp;

	(function () {

		var listNextById = function (downwards, offset, amount) {

			listNextById.precond(downwards, offset, amount);

			// -- select bookmarks in the right ID range.
			// -- sort is slow if object imp. isn't ordered.
			var bookmarksInRange = Object.keys(ENGRAM.cache).map(function (key) {
				return parseInt(key, 10);
			}).filter(function (id) {
				return downwards ? id < offset : id > offset;
			}).sort(function (num0, num1) {
				return num1 - num0;
			});

			var sliced = downwards ? bookmarksInRange.slice(0, amount) : bookmarksInRange.slice(-amount);

			return sliced.map(function (key) {
				return ENGRAM.cache[key];
			});
		};

		listNextById.precond = function (downwards, offset, amount) {

			is.always.boolean(downwards);
			is.always.number(offset);
			is.always.number(amount);
		};

		listDown = listNextById.bind({}, true);
		listUp = listNextById.bind({}, false);
	})();
}