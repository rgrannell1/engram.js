
"use strict"






var app       = require('./app')
var constants = require('./constants')
var messages  = require('./messages')
var commons   = require('./commons')
var rest      = require('./rest')




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




app.ctrl.add({
	bookmarkId:   1,
	date:         new Date(1400000000),
	url:          'http://example.com',
	displayTitle: 'Example',
	hosturl:      'http://example.com',
	hostname:     'example'
})





m.mount(document.getElementById('bookmark-container'), app)
