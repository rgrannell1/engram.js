
"use strict"





import 'constants'











var rest = { }

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
		failure: onErr
	})

}

rest.getBookmarks = (maxID, amount, onOk, onErr) => {

	$.ajax({
		url:      `/api/bookmarks?maxID=${maxID}&amount=${amount}`,
		dataType: 'json',
		success:  onOk,
		failure:  onErr
	})

}

rest.importBookmarks = (data, onOk, onErr) => {

	$.ajax({
		type:     'POST',
		url:      constants.urls.IMPORT,
		dataType: 'json',
        data:     data,
        headers:  {
        	'Content-Type': 'application/json'
        },
        success: onOk,
        failure: onErr
	})

}






export {rest}
