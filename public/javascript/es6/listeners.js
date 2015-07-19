"use strict"





var listeners = { }



{

	let eventCode = {
		escape:    27,
		backspace: 8
	}

	let isTypeable = event => {

		var key = String.fromCharCode(event.keyCode)

		return (
			(event.keyCode >= 41 && event.keyCode < 122) ||
			(event.keyCode == 32 || event.keyCode > 186))

	}

	let $window = $(window)





	// -- broadcast keystrokes.

	listeners.rebroadcastKeyEvents = ( ) => {

		$window.keydown(event => {

			event.stopPropagation( )
			var keyCode = event.keyCode

			if (event.keyCode === eventCode.escape) {

				ENGRAM.eventBus.fire(EventBus.message.PRESS_ESCAPE)

			} else if (event.keyCode === eventCode.backspace) {

				ENGRAM.eventBus.fire(EventBus.message.PRESS_BACKSPACE)

			} else if (isTypeable(event) && !event.ctrlKey && !event.altKey) {

				ENGRAM.eventBus.fire(EventBus.message.PRESS_TYPEABLE, {
					key: String.fromCharCode(event.keyCode)
				})

			}

		})

	}

}





{

	let $document = $(document)

	// -- broadcast when the user clicks a delete (X) button.

	listeners.deleteBookmark = function ( ) {

		$document.on('click', ENGRAM.selectors.DELETE_BUTTONS, function ( ) {

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
	let scrollTimer





	// -- broadcast every time the user scrolls (inefficient).


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





	// -- broadcast every time the user stops scrolling (efficient).

	listeners.onStop = ( ) => {

		ENGRAM.eventBus.on(EventBus.message.SCROLL, scrollData => {

			clearTimeout(scrollTimer)

			scrollTimer = setTimeout(( ) => {
				ENGRAM.eventBus.fire(EventBus.message.STOP, scrollData)
			}, 10)

		})

	}

}
