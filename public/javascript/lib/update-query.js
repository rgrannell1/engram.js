"use strict";

var getURL = function () {

	var match = RegExp("[?&]q=([^&]*)").exec(window.location.search);
	var result = match && decodeURIComponent(match[1].replace(/\+/g, " "));

	return is["null"](result) ? "" : result;
};

ENGRAM.eventBus.on(":press-typeable", function (_ref) {
	var key = _ref.key;

	ENGRAM.eventBus.fire(":update-url", getURL() + key);
}).on(":press-backspace", function (_ref) {
	var key = _ref.key;

	ENGRAM.eventBus.fire(":update-url", getURL().slice(0, -1));
}).on(":press-escape", function (_ref) {
	var key = _ref.key;

	ENGRAM.eventBus.fire(":update-url", "");
});

$(function () {
	return ENGRAM.eventBus.fire(":update-url", getURL());
});