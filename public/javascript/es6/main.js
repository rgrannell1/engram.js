
"use strict"






var app           = require('./app')
var constants     = require('./constants')
var messages      = require('./messages')
var commons       = require('./commons')
var rest          = require('./rest')
var syncBookmarks = require('./sync-bookmarks')



// for testing.

window.ENGRAM = {constants, messages, commons, rest}





commons.log.summary('loaded client-side code.')





$(( ) => {

	syncBookmarks(app.ctrl.model.bookmarks, {
		success: body => {
			m.redraw( )
		},
		failure: res  => {

		}
	})

	m.mount(document.body, app)

})
