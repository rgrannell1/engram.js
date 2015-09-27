(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

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

},{}]},{},[1]);
