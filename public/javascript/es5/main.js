"use strict";

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

{

	var loadState = [new Date(0), new Date(0)];

	var loadList = function (downwards, from) {

		var lastLoadIth = downwards ? 0 : 1;

		var now = new Date();

		if (now - loadState[lastLoadIth] < 150) {
			return;
		} else {
			loadState[lastLoadIth] = now;
		}

		var loaded = (downwards ? listDown : listUp)(from, ENGRAM.PERSCROLL);

		ENGRAM.inFocus.setFocus({

			value: downwards ? ENGRAM.inFocus.value.concat(loaded).slice(-ENGRAM.MAXLOADED) : loaded.concat(ENGRAM.inFocus.value).slice(0, +ENGRAM.MAXLOADED),

			currentQuery: ""
		});

		var bookmark = downwards ? $("#bookmarks article").slice(-1)[0] : $("#bookmarks article").slice(0, 1)[0];

		var originalOffset = bookmark.getBoundingClientRect().top;
		var id = $(bookmark).attr("id");

		ENGRAM.eventBus.fire(EventBus.message.LOADED_BOOKMARKS, { originalOffset: originalOffset, id: id });
	};

	var loadListDown = loadList.bind({}, true);
	var loadListUp = loadList.bind({}, false);
}

var fillBookmarks = function () {

	var currentAmount = ENGRAM.inFocus.value.length;
	var stillUnloaded = getURL() === "" && currentAmount !== ENGRAM.MAXLOADED;

	if (!stillUnloaded) {
		return;
	}

	var from = $("#bookmark-container article").length === 0 ? ENGRAM.BIGINT : parseInt($("#bookmark-container article:last").attr("id"), 10);

	var loaded = listDown(from, ENGRAM.MAXLOADED - currentAmount);

	if (loaded.length > 0) {

		ENGRAM.inFocus.setFocus({
			value: ENGRAM.inFocus.value.concat(loaded),
			currentQuery: ""
		});
	}
};

var triggerLoad = function (downwards) {

	if (getURL() === "") {
		// -- load linearly by id up or down.

		var topic = ":scroll" + (downwards ? "down" : "up") + "-bookmarks";

		ENGRAM.eventBus.fire(topic, getNextId());
	} else {
		// -- load upwards or downwards by search score.
		throw new Error("loading search results not implemented.");
	}
};

triggerLoad.top = function () {
	return triggerLoad(false);
};
triggerLoad.bottom = function () {
	return triggerLoad(true);
};

var detectEdge = function (_ref) {
	var windowTop = _ref.windowTop;
	var scrollHeight = _ref.scrollHeight;
	var scrollPosition = _ref.scrollPosition;

	var args = { windowTop: windowTop, scrollHeight: scrollHeight, scrollPosition: scrollPosition };

	var topic = scrollHeight - scrollPosition === 0 ? ":atBottom" : ":atTop";

	ENGRAM.eventBus.fire(":atTop", args);
};

var onLoadBookmark = function (bookmark) {

	var query = getURL();

	is.always.object(bookmark);
	is.always.number(bookmark.bookmarkId);

	ENGRAM.cache.set(bookmark.bookmarkId, {
		bookmark: bookmark,
		metadata: {
			scores: query.length === 0 ? {} : _defineProperty({}, query, scoreTextMatch(query, isSplitSubstring(query), bookmark.title))
		}
	});

	ENGRAM.eventBus.fire(":rescore");
};

ENGRAM.eventBus.on(":scroll", detectEdge).on(":atBottom", triggerLoad.bottom).on(":atTop", triggerLoad.top).on(":load-bookmark", onLoadBookmark).on(":scrollup-bookmarks", loadListUp).on(":scrolldown-bookmarks", loadListDown).on(":loaded-bookmarks", function (_ref) {
	var originalOffset = _ref.originalOffset;
	var id = _ref.id;

	ENGRAM.eventBus.await(":redraw", function () {
		$(window).scrollTop($("#" + id).offset().top - originalOffset);
	});
});

setImmediateInterval(ENGRAM.updateTimes, 250);
setImmediateInterval(fillBookmarks, 250);

listeners.rebroadcastKeyEvents();
listeners.deleteBookmark();
listeners.onScroll();
listeners.onStop();

ENGRAM.syncBookmarks();