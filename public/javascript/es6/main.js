
"use strict"






var app           = require('./app')
var constants     = require('./constants')
var messages      = require('./messages')
var commons       = require('./commons')
var rest          = require('./rest')
var syncBookmarks = require('./sync-bookmarks')



// for testing.

window.ENGRAM = { }

window.ENGRAM.constants = constants
window.ENGRAM.messages  = messages
window.ENGRAM.commons   = commons
window.ENGRAM.rest      = rest





commons.log.summary('loaded client-side code.', {
	is:      typeof window.is !== 'undefined',
	mithril: typeof window.m  !== 'undefined'
})





syncBookmarks(app.ctrl.model.bookmarks, {
	success: body => {

		console.log( body )
		m.redraw( )

	},
	failure: res  => {

	}
})





m.mount(document.getElementById('bookmark-container'), app)
