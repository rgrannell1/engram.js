
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
