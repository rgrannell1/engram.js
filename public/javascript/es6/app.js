
"use strict"




var commons       = require('./commons')

var Bookmark      = require('./component/bookmark')
var BookmarkList  = require('./component/bookmark-list')
var syncBookmarks = require('./sync-bookmarks')





var bookmarks = BookmarkList([ ])





syncBookmarks(bookmarks, {
	success: ( ) => { },
	failure: ( ) => { },
})




var app = bookmarks





module.exports = app
