"use strict";

var getURL = function getURL() {

	var match = RegExp('[?&]q=([^&]*)').exec(window.location.search);
	var result = match && decodeURIComponent(match[1].replace(/\+/g, ' '));

	return is['null'](result) ? '' : result;
};

ENGRAM.eventBus.on(EventBus.message.PRESS_TYPEABLE, function (_ref) {
	var key = _ref.key;

	var iter = ENGRAM.app.url.asIterator();

	if (is.undefined(iter.peekParams())) {

		ENGRAM.app.url.setParams('q=' + key);
	} else {

		var query = iter.peekParams().filter(function (_ref2) {
			var param = _ref2.param;
			var value = _ref2.value;

			return param === 'q';
		})[0];

		ENGRAM.app.url.setParams('q=' + (query.value + key));
	}
}).on(EventBus.message.PRESS_BACKSPACE, function (_ref3) {
	var key = _ref3.key;

	var iter = ENGRAM.app.url.asIterator();

	if (!is.undefined(iter.peekParams())) {

		// -- TODO this is ugly.
		var query = iter.peekParams().filter(function (_ref4) {
			var key = _ref4.key;
			var value = _ref4.value;

			return key === 'q';
		})[0];

		var newValue = query.value.slice(0, -1);

		if (newValue.length === 0) {
			ENGRAM.app.url.clearParams();
		} else {
			ENGRAM.app.url.setParams('q=' + query.value.slice(0, -1));
		}
	}
}).on(EventBus.message.PRESS_ESCAPE, function (_ref5) {
	var key = _ref5.key;

	ENGRAM.app.url.clearParams();
});

$(function () {
	return ENGRAM.eventBus.fire(EventBus.message.URL_UPDATE, getURL());
});
