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
}, 1e+29);

ENGRAM.eventBus.on(":url-update", function (_ref) {
	var current = _ref.current;
	var previous = _ref.previous;

	console.log(current);
});