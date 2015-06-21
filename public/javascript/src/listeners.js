"use strict"





var listeners = { }



{

	let eventCode = {
		'escape':    27,
		'backspace': 8
	}

	let isTypeable = event => {

		if (is.undefined(event.key)) {
			return true
		}

		return (
			(event.keyCode >= 41 && event.keyCode < 122) ||
			(event.keyCode == 32 || event.keyCode > 186)) &&
			event.key.length === 1
	}

	let $window   = $(window)





	/*
		rebroadcastKeyEvents

		convert JS keystroke events into published messages.

	*/

	listeners.rebroadcastKeyEvents = ( ) => {

		$window.keydown(event => {

			var keyCode = event.keyCode

			if (event.keyCode === eventCode.escape) {

				ENGRAM.eventBus.fire(EventBus.message.PRESS_ESCAPE)

			} else if (event.keyCode === eventCode.backspace) {

				ENGRAM.eventBus.fire(EventBus.message.PRESS_BACKSPACE)

			} else {

				if (isTypeable(event) && !event.ctrlKey && !event.altKey) {

					ENGRAM.eventBus.fire(EventBus.message.PRESS_TYPEABLE, {
						key: event.key
					})

				}

			}

		})

	}

}





{

	let $document = $(document)

	listeners.deleteBookmark = function ( ) {

		$document.on('click', '.delete-bookmark', function ( ) {

			var $button  = $(this)

			var $article = $button.closest('article')
			var id       = parseInt($article.attr('id'), 10)

			ENGRAM.eventBus.fire(EventBus.message.DELETE, {id, $button})

		})

	}

}






{

	let $window   = $(window)
	let $document = $(document)





	listeners.onScroll = ( ) => {

		$window.on('scroll', ( ) => {

			var windowTop = $window.scrollTop( )

			ENGRAM.eventBus.fire(EventBus.message.SCROLL, {

				windowTop,
				scrollHeight:   $document.height( ),
				scrollPosition: $window  .height( ) + windowTop

			})

		})

	}

	let scrollTimer

	listeners.onStop = ( ) => {

		ENGRAM.eventBus.on(EventBus.message.SCROLL, scrollData => {

			clearTimeout(scrollTimer)

			scrollTimer = setTimeout(( ) => {
				ENGRAM.eventBus.fire(EventBus.message.STOP, scrollData)
			}, 10)

		})

	}

}
