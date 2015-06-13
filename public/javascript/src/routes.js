
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

}, 100000000000000000000000000000)




ENGRAM.eventBus.on(':url-update', ({current, previous}) => {

	console.log( current )

})
