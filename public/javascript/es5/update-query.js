"use strict";

var getURL = function () {

	var match = RegExp("[?&]q=([^&]*)").exec(window.location.search);
	var result = match && decodeURIComponent(match[1].replace(/\+/g, " "));

	return is["null"](result) ? "" : result;
};

ENGRAM.eventBus.on(EventBus.message.PRESS_TYPEABLE, function (_ref) {
	var key = _ref.key;

	var iter = ENGRAM.app.url.asIterator();

	ENGRAM.app.url.setParams((iter.peekWholeParams() || "") + key);
}).on(EventBus.message.PRESS_BACKSPACE, function (_ref) {
	var key = _ref.key;

	var iter = ENGRAM.app.url.asIterator();

	ENGRAM.app.url.setParams((iter.peekWholeParams() || "").slice(0, -1));
}).on(EventBus.message.PRESS_ESCAPE, function (_ref) {
	var key = _ref.key;

	ENGRAM.app.url.clearParams();
});

$(function () {
	return ENGRAM.eventBus.fire(EventBus.message.URL_UPDATE, getURL());
});