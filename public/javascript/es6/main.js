
"use strict"






var constants = require('./constants')
var messages  = require('./messages')
var commons   = require('./commons')
var rest      = require('./rest')

var Bookmark  = require('./model/bookmark')





// for testing.

window.ENGRAM = { }

window.ENGRAM.constants = constants
window.ENGRAM.messages  = messages
window.ENGRAM.commons   = commons
window.ENGRAM.rest      = rest





console.log('main: loaded.')




var elem = Bookmark({
	url:          'http://mithril.js.org/mithril.mount.html',
	displayTitle: 'Mount',
	hosturl:      'http://mithril.js.org',
	hostname:     'mithril',
	date:         (new Date( )).getTime( ),
	bookmarkId:   '0'
})





m.mount( document.body, elem )
