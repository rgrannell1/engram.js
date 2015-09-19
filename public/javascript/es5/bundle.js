(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

"use strict";

var commons = {};

commons.data = {};
commons.data.string = {};
commons.date = {};
commons.messages = {};
commons.log = {};

commons.date.formatDate = function (date) {

	var dateString = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');

	var timeString = [date.getHours(), date.getMinutes()].join(':');

	return dateString + ' ' + timeString;
};

commons.date.formatElapsed = {};
commons.date.formatInterval = {};
commons.date.interval = {};
commons.date.addUnit = {
	second: function second(time) {
		return time + 's';
	},
	minute: function minute(time) {
		return time + 'm';
	},
	hour: function hour(time) {
		return time + 'h';
	},
	month: function month(time) {

		var day = constants.date.SHORT_MONTHS[time.getMonth()];
		var month = time.getDate();

		return day + ' ' + month;
	},
	year: function year(time) {

		var day = constants.date.SHORT_MONTHS[time.getMonth()];
		var month = time.getDate();
		var year = time.getFullYear();

		return day + ' ' + month + ' ' + year;
	}
};

{

	var timeInterval = function timeInterval(factor, newer, older) {
		return Math.floor((newer - older) / factor);
	};

	commons.date.interval.s = timeInterval.bind({}, 1000);
	commons.date.interval.ms = timeInterval.bind({}, 1);
}

commons.date.formatElapsed.ms = function (millis) {

	if (millis < constants.date.MINUTE_IN_MS) {

		return commons.date.addUnit.second(millis / constants.date.S_IN_MS);
	} else if (millis < constants.date.HOUR_IN_MS) {

		return commons.date.addUnit.minute(millis / constants.date.S_IN_MS);
	} else if (millis < constants.date.DAY_IN_MS) {} else {}
};

commons.date.formatElapsed.s = function (seconds) {
	return commons.date.formatElapsed.ms(constants.date.S_IN_MS * seconds);
};

{

	var formatInterval = function formatInterval(factor, newer, older) {
		return commons.date.formatElapsed(commons.date.interval.ms(newer, older));
	};

	commons.date.formatInterval.s = formatInterval.bind({}, 1000);
	commons.date.formatInterval.ms = formatInterval.bind({}, 1);
}

commons.data['enum'] = function (labels) {

	var lookup = {};

	labels.forEach(function (label, ith) {
		lookup[label] = ith.toString();
	});

	return lookup;
};

commons.data.string.locate = function (char, string) {
	var from = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

	for (var ith = from; ith < string.length; ++ith) {
		if (char === string.charAt(ith)) {
			return ith;
		}
	}

	return -1;
};

commons.log.levelNames = ['trace', 'info', 'summary', 'warning-low', 'warning-high', 'error', 'fatal'];
commons.log.formatMessage = function (level, message, data) {
	return level + ':' + message + ' ' + JSON.stringify(data);
};

commons.log.levelNames.forEach(function (level) {
	commons.log[level] = commons.log.formatMessage.bind({}, level);
});

module.exports = commons;

},{}],2:[function(require,module,exports){

"use strict";

var constants = {};
constants.urls = {};
constants.selectors = {};
constants.date = {};

constants.date.SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

constants.date.MINUTE_IN_S = 60;
constants.date.HOUR_IN_S = 3600;
constants.date.DAY_IN_S = 24 * 3600;

constants.date.S_IN_MS = constants.date.S_IN_MS * 1000;
constants.date.MINUTE_IN_MS = constants.date.S_IN_MS * 60;
constants.date.HOUR_IN_MS = constants.date.S_IN_MS * 3600;
constants.date.DAY_IN_MS = constants.date.S_IN_MS * 24 * 3600;

constants.urls.BOOKMARK_TEMPLATE = '/public/html/bookmark-template.html';
constants.urls.IMPORT = '/api/import';

constants.selectors.BOOKMARKS = '#bookmarks';
constants.selectors.BOOKMARK_CONTAINER = '#bookmark-container';
constants.selectors.ARTICLES = '#bookmarks article';
constants.selectors.UPLOAD_FORM = '#uploader-hidden';
constants.selectors.UPLOAD_BUTTON = '#uploader';
constants.selectors.DELETE_BUTTONS = '.delete-bookmark';
constants.selectors.TIMES = '.bookmark time';

module.exports = constants;

},{}],3:[function(require,module,exports){

"use strict";

var constants = require('./constants');
var messages = require('./messages');
var commons = require('./commons');
var rest = require('./rest');

// for testing.

window.ENGRAM = {};

window.ENGRAM.constants = constants;
window.ENGRAM.messages = messages;
window.ENGRAM.commons = commons;
window.ENGRAM.rest = rest;

console.log('main: loaded all browser modules');

},{"./commons":1,"./constants":2,"./messages":4,"./rest":5}],4:[function(require,module,exports){

"use strict";

var commons = require('./commons');

var messages = {};
messages.pubsub = commons.data["enum"]([]);

module.exports = messages;

},{"./commons":1}],5:[function(require,module,exports){

"use strict";

var constants = require('./constants');

var rest = {};

rest.getTemplate = function (onOk, onErr) {

	$.get(constants.urls.BOOKMARK_TEMPLATE).done(onOk).always(onErr);
};

rest.deleteBookmark = function (id, onOk, onErr) {

	$.ajax({
		url: '/api/bookmarks/' + id,
		type: 'DELETE',
		success: onOk,
		failure: onErr
	});
};

rest.getBookmarks = function (maxID, amount, onOk, onErr) {

	$.ajax({
		url: '/api/bookmarks?maxID=' + maxID + '&amount=' + amount,
		dataType: 'json',
		success: onOk,
		failure: onErr
	});
};

rest.importBookmarks = function (data, onOk, onErr) {

	$.ajax({
		type: 'POST',
		url: constants.urls.IMPORT,
		dataType: 'json',
		data: data,
		headers: {
			'Content-Type': 'application/json'
		},
		success: onOk,
		failure: onErr
	});
};

module.exports = rest;

},{"./constants":2}]},{},[3]);
