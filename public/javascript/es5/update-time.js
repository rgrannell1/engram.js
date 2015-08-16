"use strict";

{
	var formatInterval;
	var extractTime;
	var secondsBetween;
	var renderTime;

	(function () {

		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

		var oneMinute = 60;
		var oneHour = 3600;
		var oneDay = 24 * 3600;

		formatInterval = function formatInterval(seconds) {

			var formatted = '';
			var now = new Date();
			var ctime = new Date(now - 1000 * seconds);

			if (seconds < oneMinute) {
				formatted = seconds + "s";
			} else if (seconds < oneHour) {
				formatted = Math.round(seconds / oneMinute) + "m";
			} else if (seconds < oneDay) {
				formatted = Math.round(seconds / oneHour) + "h";
			} else {

				var year = ctime.getFullYear() === now.getFullYear() ? '' : ctime.getFullYear();

				formatted = months[ctime.getMonth()] + " " + ctime.getDate() + " " + year;
			}

			return formatted;
		};

		extractTime = function extractTime(time) {
			return new Date(parseInt($(time).attr('data-ctime'), 10) * 1000);
		};

		secondsBetween = function secondsBetween(recent, old) {
			return Math.floor((recent - old) / 1000);
		};

		renderTime = function renderTime($time) {

			var elapsed = secondsBetween(new Date(), extractTime($time));
			var formatted = formatInterval(elapsed);

			if ($time.text() !== formatted) {
				$time.text(formatted);
			}
		};

		ENGRAM.updateTimes = function () {

			$(ENGRAM.selectors.TIMES).each(function () {
				renderTime($(this));
			});
		};
	})();
}
