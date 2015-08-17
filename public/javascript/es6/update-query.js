"use strict"





var getURL = ( ) => {

	var match  = RegExp('[?&]q=([^&]*)').exec(window.location.search)
	var result = match && decodeURIComponent(match[1].replace(/\+/g, ' '))

	return is.null(result) ? '' : result

}





ENGRAM.eventBus
.on(EventBus.message.PRESS_TYPEABLE, ({key}) => {

	var iter  = ENGRAM.app.url.asIterator( )

	if ( is.undefined(iter.peekParams( )) ) {

		ENGRAM.app.url.setParams(`q=${key}`)

	} else {

		var query = iter.peekParams( ).filter( ({param, value}) => {
			return param === 'q'
		})[0]

		ENGRAM.app.url.setParams(`q=${query.value + key}`)

	}


})
.on(EventBus.message.PRESS_BACKSPACE, ({key}) => {

	var iter = ENGRAM.app.url.asIterator( )

	if ( !is.undefined(iter.peekParams( )) ) {

		// -- TODO this is ugly.
		var query    = iter.peekParams( ).filter( ({key, value}) => {
			return key === 'q'
		})[0]

		var newValue = query.value.slice(0, -1)

		if (newValue.length === 0) {
			ENGRAM.app.url.clearParams( )
		} else {
			ENGRAM.app.url.setParams(`q=${ query.value.slice(0, -1) }`)
		}

	}


})
.on(EventBus.message.PRESS_ESCAPE, ({key}) => {

	ENGRAM.app.url.clearParams( )

})





$( ( ) => ENGRAM.eventBus.fire( EventBus.message.URL_UPDATE, getURL( )) )
