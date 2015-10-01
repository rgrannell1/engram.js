
"use strict"



var onFetch = {
	success: (callback, data) => {

		callback(data)

	},
	failure: (callback, res) => {

		callback(res)

	}
}





var syncBookmarks = (app, callbacks) => {

	rest.getBookmarks(MAXID, AMOUNT, {
		success: onFetch.success.bind({ }, callbacks.success),
		failure: onFetch.failure.bind({ }, callbacks.failure)
	})

}




module.exports = syncBookmarks
