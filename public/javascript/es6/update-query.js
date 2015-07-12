
"use strict"





var getURL = ( ) => {

	var match  = RegExp('[?&]q=([^&]*)').exec(window.location.search)
	var result = match && decodeURIComponent(match[1].replace(/\+/g, ' '))

	return is.null(result) ? '' : result

}





ENGRAM.eventBus
.on(EventBus.message.PRESS_TYPEABLE, ({key}) => {

	var iter = ENGRAM.app.url.asIterator( )

	ENGRAM.app.url.setParams( (iter.peekWholeParams( ) || '') + key )

})
.on(EventBus.message.PRESS_BACKSPACE, ({key}) => {

	var iter = ENGRAM.app.url.asIterator( )

	ENGRAM.app.url.setParams( (iter.peekWholeParams( ) || '').slice(0, -1) )

})
.on(EventBus.message.PRESS_ESCAPE, ({key}) => {

	ENGRAM.app.url.clearParams( )

})





$( ( ) => ENGRAM.eventBus.fire( EventBus.message.URL_UPDATE, getURL( )) )
