
"use strict"

{

	// -- request all bookmarks below a given id number.

	let requestBookmarks = (maxID, callback) => {

		requestBookmarks.precond(maxID, callback)

		$.ajax({
			url:      `/api/bookmarks?maxID=${maxID}&amount=${ENGRAM.PERREQUEST}`,
			dataType: 'json',
			success: ({data, nextID}) => {

				data.forEach(bookmark => {
					ENGRAM.eventBus.fire(EventBus.message.LOAD_BOOKMARK, bookmark)
				})

				callback({data, nextID})

			},
			failure: res => {
				console.log('internal failure: bookmark chunk failed to load.')
			}

		})

	}

	requestBookmarks.precond = (maxID, callback) => {

		is.always.number(maxID, maxID => {
			`requestBookmarks: maxID was not a number (actual value: ${ JSON.stringify(maxID) })`
		})

		is.always.function(callback)

	}





	var recur = function ({data, nextID}) {

		recur.precond(data, nextID)

		nextID > 0 && data.length > 0
			? setTimeout(requestBookmarks, ENGRAM.loadInterval, nextID, recur)
			: console.log('loaded all bookmarks.')

	}

	recur.precond = (data, nextID) => {
		is.always.array(data)
		is.always.number(nextID)
	}



	// -- sync bookmarks recurs when the data is loaded, fetching all bookmarks.

	ENGRAM.syncBookmarks = requestBookmarks.bind({ }, ENGRAM.BIGINT, recur)


}
