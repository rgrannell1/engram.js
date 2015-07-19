"use strict";

// -- remove this if I find an objective reason
// -- this is bad.

ENGRAM.drawFocus = function () {
	setTimeout(function () {
		return ENGRAM.drawFocus(ENGRAM.inFocus);
	}, 100);
};

var prettifyDate = function (date) {

	var dateString = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	var timeString = date.getHours() + ":" + date.getMinutes();

	return dateString + " " + timeString;
};

var renderBookmark = function (bookmark, template) {

	renderBookmark.precond(bookmark, template);

	bookmark.date = prettifyDate(new Date(1000 * bookmark.ctime));

	// -- default to the url, if no title is saved yet.
	bookmark.displayTitle = bookmark.title ? bookmark.title : bookmark.url;

	bookmark.hasTitleFlag = bookmark.title ? "titled" : "";

	bookmark.hasStatusCode = bookmark.status_code ? "status-coded" : "";

	bookmark.isDeadLink = bookmark.status_code && [403, 404, 410].indexOf(bookmark.status_code) !== -1 || bookmark.status_code >= 500 ? "dead" : "";

	return Mustache.render(template, bookmark);
};

renderBookmark.precond = function (bookmark, template) {

	is.always.object(bookmark);
	is.always.string(template);
};

$.get("/public/html/bookmark-template.html", function (template) {

	ENGRAM.drawFocus = function (focus) {

		ENGRAM.drawFocus.precond(focus);

		$("#bookmark-container").html(focus.value.map(function (_ref) {
			var bookmark = _ref.bookmark;
			var _ = _ref._;
			return renderBookmark(bookmark, template);
		}).join(""));

		ENGRAM.eventBus.fire(EventBus.message.REDRAW, {});
	};

	ENGRAM.drawFocus.precond = function (focus) {

		is.always.object(focus);
		is.always.array(focus.value);
		is.always.string(focus.currentQuery);
	};
});

ENGRAM.eventBus.on(EventBus.message.UPDATE_FOCUS, ENGRAM.drawFocus);