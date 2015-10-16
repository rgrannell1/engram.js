
"use strict"





var rest = require('./rest')





// todo; adapt this to work with streaming api!

var syncBookmarks = (bookmarks, callbacks) => {

	syncBookmarks.precond(bookmarks, callbacks)

	// -- remove eventually.
	var constants = {maxId: 1000000, amount: 1000000}

	rest.getBookmarks(constants.maxId, constants.amount, {
		success: body => {

			body.data.forEach(datum => bookmarks.push(datum))
			callbacks.success(body)

		},
		failure: callbacks.failure
	})

}





syncBookmarks.precond = (bookmarks, callbacks) => {

	is.always.array(bookmarks)
	is.always.object(callbacks)

	is.always.function(callbacks.success)
	is.always.function(callbacks.failure)

}




module.exports = syncBookmarks
