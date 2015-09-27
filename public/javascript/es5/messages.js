
"use strict";

var view = function view(model) {

	var bookmarkLink = m('a', {
		href: model.url(),
		'class': 'title --hastitle--',
		rel: 'external noreferrer'
	}, model.displayTitle());

	var hostLink = m('a', {
		href: model.hosturl(),
		'class': 'hosturl',
		rel: 'external noreferrer'
	}, model.hostname());

	var timeDisplay = m('time', {
		title: model.date()
	}, '&#160;');

	var twitterLink = m('a', {
		title: 'Share Link...',
		href: commons.external.toShareLink(model.url()),
		target: '_blank'
	}, '&#x1f381');

	var archiveLink = m('a', {
		title: 'Show Archive...',
		href: commons.external.toArchiveLink(model.bookmarkId()),
		target: '_blank'
	}, '#x1F5C3');

	var deleteLink = m('a', {
		title: 'Delete',
		href: 'javascript:void(0)'
	}, '&#x2716');

	var divider = m('span', {
		'class': 'divider'
	}, '|');

	return m('article', [m('ul', [m('li', [bookmarkLink, divider, hostLink]), m('li', [timeDisplay]), m('li', [twitterLink, divider, archiveLink, divider, deleteLink])])]);
};

var Bookmark = function Bookmark(data) {

	var model = {};

	Object.keys(data).forEach(function (prop) {
		model[prop] = m.prop(data[prop]);
	});

	return {
		controller: ctrl,
		view: view.bind({}, model)
	};
};

module.exports = Bookmark;
