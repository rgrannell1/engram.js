"use strict";

var getURL = function () {

	var match = RegExp("[?&]q=([^&]*)").exec(window.location.search);
	var result = match && decodeURIComponent(match[1].replace(/\+/g, " "));

	return is["null"](result) ? "" : result;
};

ENGRAM.eventBus.on(EventBus.message.PRESS_TYPEABLE, function (_ref) {
	var key = _ref.key;

	var iter = ENGRAM.app.url.asIterator();

	if (is.undefined(iter.peekParams())) {

		ENGRAM.app.url.setParams("q=" + key);
	} else {

		var query = iter.peekParams().filter(function (_ref2) {
			var key = _ref2.key;
			var value = _ref2.value;
			return key === "q";
		})[0];
		ENGRAM.app.url.setParams("q=" + (query.value + key));
	}
}).on(EventBus.message.PRESS_BACKSPACE, function (_ref) {
	var key = _ref.key;

	var iter = ENGRAM.app.url.asIterator();

	if (!is.undefined(iter.peekParams())) {

		var query = iter.peekParams().filter(function (_ref2) {
			var key = _ref2.key;
			var value = _ref2.value;
			return key === "q";
		})[0];
		ENGRAM.app.url.setParams("q=" + query.value.slice(0, -1));
	}
}).on(EventBus.message.PRESS_ESCAPE, function (_ref) {
	var key = _ref.key;

	ENGRAM.app.url.clearParams();
});

$(function () {
	return ENGRAM.eventBus.fire(EventBus.message.URL_UPDATE, getURL());
});