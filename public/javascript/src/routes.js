
"use strict"





var previous;

setInterval(( ) => {

	if (previous !== window.location.href) {

		previous = window.location.href

		ENGRAM.eventBus.fire(':url-update', {
			current:  window.location.href,
			previous: previous
		})

	}

}, 100)





ENGRAM.eventBus.on(':update-url', url => {

	if (is.string(url)) {
		url.length === 0
			? history.pushState(null, '', '/bookmarks')
			: history.pushState(null, '', `/bookmarks?q=${encodeURIComponent(url)}`)
	} else {
		throw TypeError(`${url} was not a valid URL.`)
	}

})

ENGRAM.eventBus.on(':hash-id', id => {
	history.pushState(null, null, '#' + id)
})





{
	let $bookmarks = $('#bookmarks')

	let compare = ($elem, actual) => {
		return $elem.position( ).top - expected
	}

	ENGRAM.eventBus.on(':stop', ({windowTop, scrollHeight, scrollPosition}) => {

		// -- binary search?
		for (var ith = 0; ith < ENGRAM.inFocus.value.length; ++ith) {

			var id          = ENGRAM.inFocus.value[ith].bookmark.bookmarkId
			var topPosition = $bookmarks.find(`#${id}`).position( ).top - windowTop

			if (topPosition >= 0) {
				ENGRAM.eventBus.fire(':hash-id', id)
				break
			}
		}


	})

}

