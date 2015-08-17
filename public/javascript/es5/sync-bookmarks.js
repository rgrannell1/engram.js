
"use strict";

{
	var recur;

	(function () {

		// -- request all bookmarks below a given id number.

		var requestBookmarks = function requestBookmarks(maxID, callback) {

			requestBookmarks.precond(maxID, callback);

			$.ajax({
				url: '/api/bookmarks?maxID=' + maxID + '&amount=' + ENGRAM.PERREQUEST,
				dataType: 'json',
				success: function success(_ref) {
					var data = _ref.data;
					var nextID = _ref.nextID;

					data.forEach(function (bookmark) {
						ENGRAM.eventBus.fire(EventBus.message.LOAD_BOOKMARK, bookmark);
					});

					callback({ data: data, nextID: nextID });
				},
				failure: function failure(res) {
					console.log('internal failure: bookmark chunk failed to load.');
				}

			});
		};

		requestBookmarks.precond = function (maxID, callback) {

			is.always.number(maxID, function (maxID) {
				'requestBookmarks: maxID was not a number (actual value: ' + JSON.stringify(maxID) + ')';
			});

			is.always['function'](callback);
		};

		recur = function recur(_ref2) {
			var data = _ref2.data;
			var nextID = _ref2.nextID;

			recur.precond(data, nextID);

			nextID > 0 && data.length > 0 ? setTimeout(requestBookmarks, ENGRAM.loadInterval, nextID, recur) : console.log('loaded all bookmarks.');
		};

		recur.precond = function (data, nextID) {
			is.always.array(data);
			is.always.number(nextID);
		};

		// -- sync bookmarks recurs when the data is loaded, fetching all bookmarks.

		ENGRAM.syncBookmarks = requestBookmarks.bind({}, ENGRAM.BIGINT, recur);
	})();
}
