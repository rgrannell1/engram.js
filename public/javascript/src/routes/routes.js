
"use strict"





/*
	mirror any changes to the URL data in the actual location bar.
*/

ENGRAM.eventBus.on(EventBus.message.URL_UPDATE, query => {

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





/*
	update the url hash.
*/

{
	let $bookmarks = $('#bookmarks')

	ENGRAM.eventBus.on(EventBus.message.STOP, ({windowTop, scrollHeight, scrollPosition}) => {

		// -- binary search?
		for (var ith = 0; ith < ENGRAM.inFocus.value.length; ++ith) {

			var id          = ENGRAM.inFocus.value[ith].bookmark.bookmarkId
			var topBookmark = $bookmarks.find(`#${id}`)

			if (is.object(topBookmark)) {
				var topPosition = topBookmark.position( ).top - windowTop

				if (topPosition >= 0) {
					ENGRAM.eventBus.fire(EventBus.message.HASH_ID, id)
					break
				}
			}
		}


	})

}





var app = Router( )





Router( )
.onChange(

	use.location
	.where.path('bookmarks')
	.compile( ),

	(query, next) => {

	}

)
.run( )
