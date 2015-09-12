
"use strict";

var dom = {};

dom.update = {};
dom.select = {};
dom.toHTML = {};
dom.fromHTML = {};

dom.refreshTimes = function ($times) {
	$times.each(function () {
		dom.update.elemText(dom.toHTML.time(new Date()), $(this));
	});
};

dom.parse.creationTime = function ($time) {};

module.exports = dom;
