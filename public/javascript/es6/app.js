
"use strict"




var commons      = require('./commons')
var Bookmark     = require('./model/bookmark')
var BookmarkList = require('./model/bookmark-list')





var bookmark  = {

	url:          'http://mithril.js.org/mithril.mount.html',
	displayTitle: 'Mount',
	hosturl:      'http://mithril.js.org',
	hostname:     'mithril',
	date:         new Date(1400000000),
	bookmarkId:   '0'

}

var bookmarks = [ ]
var elem      = BookmarkList(bookmarks)





var app = elem // todo change





module.exports = app
