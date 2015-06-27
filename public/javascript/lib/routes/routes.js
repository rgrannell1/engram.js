"use strict";

/*
	mirror any changes to the URL data in the actual location bar.
*/

ENGRAM.eventBus.on(EventBus.message.URL_UPDATE, function (query) {

	if (is.string(query)) {
		query.length === 0 ? history.pushState(null, "", "/bookmarks" + window.location.hash) : history.pushState(null, "", "/bookmarks?q=" + encodeURIComponent(query) + "" + window.location.hash);
	} else {
		throw TypeError("" + query + " was not a valid URL.");
	}
});

ENGRAM.eventBus.on(EventBus.message.HASH_ID, function (id) {
	history.pushState(null, null, "#" + id);
});

/*
	update the url hash.
*/

{
	(function () {
		var $bookmarks = $("#bookmarks");

		ENGRAM.eventBus.on(EventBus.message.STOP, function (_ref) {
			var windowTop = _ref.windowTop;
			var scrollHeight = _ref.scrollHeight;
			var scrollPosition = _ref.scrollPosition;

			// -- binary search?
			for (var ith = 0; ith < ENGRAM.inFocus.value.length; ++ith) {

				var id = ENGRAM.inFocus.value[ith].bookmark.bookmarkId;
				var topPosition = $bookmarks.find("#" + id).position().top - windowTop;

				if (topPosition >= 0) {
					ENGRAM.eventBus.fire(EventBus.message.HASH_ID, id);
					break;
				}
			}
		});
	})();
}

var app = Router();

app.onChange(use.location.where.path("bookmarks").compile(), function (location, next) {
	console.log("something changed.");
}).onChange(use.location.where.path("bookmarks").where.params(function (_) {
	return true;
}).compile(), function (location, next) {
	console.log("parametres changed.");
}).run();