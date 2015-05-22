"use strict";

":use strict";

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

$.get("/public/html/bookmark-template.html", function (template) {

	var renderBookmark = function (bookmark) {

		renderBookmark.precond(bookmark);

		bookmark.date = prettifyDate(new Date(1000 * bookmark.ctime));

		bookmark.displayTitle = bookmark.title ? bookmark.title : bookmark.url;

		bookmark.hasTitleFlag = bookmark.title ? "titled" : "";

		bookmark.hasStatusCode = bookmark.status_code ? "status-coded" : "";

		bookmark.hasArchiveFlag = bookmark.archive ? "archived" : "";

		bookmark.isDeadLink = bookmark.status_code && [403, 404, 410].indexOf(bookmark.status_code) !== -1 || bookmark.status_code >= 500 ? "dead" : "";

		return Mustache.render(template, bookmark);
	};

	renderBookmark.precond = function (bookmark) {
		is.always.object(bookmark);
	};

	ENGRAM.drawFocus = function (focus) {

		ENGRAM.drawFocus.precond(focus);

		$("#bookmark-container").html(focus.value.map(function (_ref) {
			var bookmark = _ref.bookmark;
			var _ = _ref._;
			return renderBookmark(bookmark);
		}).reduce(function (html0, html1) {
			return html0 + html1;
		}, ""));

		ENGRAM.eventBus.fire(":redraw", {});
	};

	ENGRAM.drawFocus.precond = function (focus) {

		is.always.object(focus);
		is.always.array(focus.value);
		is.always.string(focus.currentQuery);
	};
});

ENGRAM.eventBus.on(":update-focus", ENGRAM.drawFocus);