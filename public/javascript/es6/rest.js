
"use strict"





var constants = require('./constants')





var rest = { }

rest.url    = { }
rest.import = { }

rest.url.shareLink = url => {
	return `http://www.twitter.com/share?url=${url}`
}

rest.url.archiveLink = id => {
	return `archive/${id}`
}

rest.url.getBookmarks = (maxID, amount) => {
	return `api/bookmarks?maxID=${maxID}&amount=${amount}`
}

rest.url.importBookmarks = ( ) => {
	return '/import'
}





rest.getTemplate = (onOk, onErr) => {

	$.get(constants.urls.BOOKMARK_TEMPLATE)
	.done(onOk)
	.always(onErr)

}

rest.deleteBookmark = (id, onOk, onErr) => {

	$.ajax({
		url:     `/api/bookmarks/${id}`,
		type:    'DELETE',
		success: onOk,
		error:   onErr
	})

}

rest.getBookmarks = (maxID, amount, callbacks) => {

	$.ajax({
		url:      rest.url.getBookmarks(maxID, amount),
		dataType: 'json',
		success:  callbacks.success,
		error:    callbacks.failure
	})

}

rest.import.pocket = (data, onOk, onErr) => {

	$.ajax({
		type:     'POST',
		url:      rest.url.importBookmarks( ),
		dataType: 'json',
        data,
        headers:  {
        	'Content-Type': 'application/json'
        },
        success: onOk,
        error:   onErr
	})

}





module.exports = rest
