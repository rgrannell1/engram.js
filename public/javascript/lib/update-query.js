"use strict";

var getURL = function () {

	var match = RegExp("[?&]q=([^&]*)").exec(window.location.search);
	var result = match && decodeURIComponent(match[1].replace(/\+/g, " "));

	return is["null"](result) ? "" : result;
};

ENGRAM.eventBus.on(message.PRESS_TYPEABLE, function (_ref) {
	var key = _ref.key;

	ENGRAM.eventBus.fire(message.URL_UPDATE, getURL() + key);
}).on(message.PRESS_BACKSPACE, function (_ref) {
	var key = _ref.key;

	ENGRAM.eventBus.fire(message.URL_UPDATE, getURL().slice(0, -1));
}).on(message.PRESS_ESCAPE, function (_ref) {
	var key = _ref.key;

	ENGRAM.eventBus.fire(message.URL_UPDATE, "");
});

$(function () {
	return ENGRAM.eventBus.fire(message.URL_UPDATE, getURL());
});