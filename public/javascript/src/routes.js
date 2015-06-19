
"use strict"





var previous

setInterval(( ) => {

	if (previous !== window.location.href) {

		previous = window.location.href

		ENGRAM.eventBus.fire(message.URL_UPDATE, {
			current:  window.location.href,
			previous: previous
		})

	}

}, 100)





ENGRAM.eventBus.on(message.UPDATE_URL, url => {

	if (is.string(url)) {
		url.length === 0
			? history.pushState(null, '', `/bookmarks${window.location.hash}`)
			: history.pushState(null, '', `/bookmarks?q=${encodeURIComponent(url)}${window.location.hash}`)
	} else {
		throw TypeError(`${url} was not a valid URL.`)
	}

})

ENGRAM.eventBus.on(message.HASH_ID, id => {
	history.pushState(null, null, '#' + id)
})





{
	let $bookmarks = $('#bookmarks')

	let compare = ($elem, actual) => {
		return $elem.position( ).top - expected
	}

	ENGRAM.eventBus.on(message.STOP, ({windowTop, scrollHeight, scrollPosition}) => {

		// -- binary search?
		for (var ith = 0; ith < ENGRAM.inFocus.value.length; ++ith) {

			var id          = ENGRAM.inFocus.value[ith].bookmark.bookmarkId
			var topPosition = $bookmarks.find(`#${id}`).position( ).top - windowTop

			if (topPosition >= 0) {
				ENGRAM.eventBus.fire(message.HASH_ID, id)
				break
			}
		}


	})

}

