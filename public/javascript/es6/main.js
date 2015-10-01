
"use strict"






var app       = require('./app')
var constants = require('./constants')
var messages  = require('./messages')
var commons   = require('./commons')
var rest      = require('./rest')
var is        = require('./dependency-is')




// for testing.

window.ENGRAM = { }

window.ENGRAM.constants = constants
window.ENGRAM.messages  = messages
window.ENGRAM.commons   = commons
window.ENGRAM.rest      = rest





commons.log.info('main: loaded.', {
	is:      typeof window.is !== 'undefined',
	mithril: typeof window.m  !== 'undefined'
})





m.mount(document.getElementById('bookmark-container'), app)
