
"use strict"





var rest = require('./rest')





// todo; adapt this to work with streaming api!

var syncBookmarks = (bookmarkList, callbacks) => {

	syncBookmarks.precond(bookmarkList, callbacks)

	// -- remove eventually.
	var constants = {maxId: 1000000, amount: 1000000}

	rest.getBookmarks(constants.maxId, constants.amount, {
		success: body => {

			body.data.forEach(bookmarkList.ctrl.add)
			callbacks.success(body)

		},
		failure: callbacks.failure
	})

}





syncBookmarks.precond = (bookmarkList, callbacks) => {

	is.always.object(bookmarkList)
	is.always.object(callbacks)

	is.always.function(callbacks.success)
	is.always.function(callbacks.failure)

}




module.exports = syncBookmarks
