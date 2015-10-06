
"use strict"




var commons      = require('./commons')
var Page         = require('./component/page')
var Sidebar      = require('./component/sidebar')
var BookmarkList = require('./component/bookmark-list')





var app = Page({
	sidebar:   null,
	bookmarks: [ ]
})





module.exports = app

