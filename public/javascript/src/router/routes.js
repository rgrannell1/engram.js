
"use strict"



var previous

setInterval(( ) => {

	if (previous !== window.location.href) {

		previous = window.location.href

		ENGRAM.eventBus.fire(EventBus.message.URL_UPDATE, {
			current:  window.location.href,
			previous: previous
		})

	}

}, 100)





/*
	mirror any changes to the URL data in the actual location bar.
*/

ENGRAM.eventBus.on(EventBus.message.UPDATE_URL, query => {

	if (is.string(query)) {
		query.length === 0
			? history.pushState(null, '', `/bookmarks${window.location.hash}`)
			: history.pushState(null, '', `/bookmarks?q=${encodeURIComponent(query)}${window.location.hash}`)
	} else {
		throw TypeError(`${query} was not a valid URL.`)
	}

})

ENGRAM.eventBus.on(EventBus.message.HASH_ID, id => {
	history.pushState(null, null, '#' + id)
})





{
	let $bookmarks = $('#bookmarks')

	ENGRAM.eventBus.on(EventBus.message.STOP, ({windowTop, scrollHeight, scrollPosition}) => {

		// -- binary search?
		for (var ith = 0; ith < ENGRAM.inFocus.value.length; ++ith) {

			var id          = ENGRAM.inFocus.value[ith].bookmark.bookmarkId
			var topPosition = $bookmarks.find(`#${id}`).position( ).top - windowTop

			if (topPosition >= 0) {
				ENGRAM.eventBus.fire(EventBus.message.HASH_ID, id)
				break
			}
		}


	})

}







var route =

	Router( ).onChange(
		location => true,
		( ) => {
			console.log( '++ ++ ++ ++ ++ ++ ' )
			console.log( window.location.href )
		}
	)
	.run( )