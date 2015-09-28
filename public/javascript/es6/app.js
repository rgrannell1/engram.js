
"use strict"





var Bookmark  = require('./model/bookmark')





var elem = Bookmark({

	url:          'http://mithril.js.org/mithril.mount.html',
	displayTitle: 'Mount',
	hosturl:      'http://mithril.js.org',
	hostname:     'mithril',
	date:         new Date( ),
	bookmarkId:   '0'

})




var app = elem // todo change





module.exports = app
