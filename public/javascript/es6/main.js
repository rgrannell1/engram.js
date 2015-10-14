
"use strict"






var app           = require('./app')
var constants     = require('./constants')
var messages      = require('./messages')
var commons       = require('./commons')
var rest          = require('./rest')
var syncBookmarks = require('./sync-bookmarks')
var listeners     = require('./listeners')



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

	listeners.onScroll(scrollData => {

		listeners.atPageTop(scrollData, ( ) => {
			commons.log.stub('top: hook into model.')
		})

		listeners.atPageBottom(scrollData, ( ) => {
			commons.log.stub('bottom: hook into model.')
		})

	})

	m.mount(document.body, app)

})
