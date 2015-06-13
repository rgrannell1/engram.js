"use strict";

var previous;

setInterval(function () {

	if (previous !== window.location.href) {

		previous = window.location.href;

		ENGRAM.eventBus.fire(":url-update", {
			current: window.location.href,
			previous: previous
		});
	}
}, 100);

ENGRAM.eventBus.on(":update-url", function (url) {

	if (is.string(url)) {
		url.length === 0 ? history.pushState(null, "", "/bookmarks") : history.pushState(null, "", "/bookmarks?q=" + encodeURIComponent(url));
	} else {
		throw TypeError("" + url + " was not a valid URL.");
	}
});