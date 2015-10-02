
"use strict"



// this is a very dumb general adapter at the moment; fix.

var syncBookmarks = callbacks => {

	rest.getBookmarks(MAXID, AMOUNT, {
		success: data => {

			callbacks.success(data)

			// save the bookmarks, re-request.

		},
		failure: res => {

			callbacks.failure(data)

		}
	})

}




module.exports = syncBookmarks
