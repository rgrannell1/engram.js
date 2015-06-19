
"use strict"





var getURL = ( ) => {

	var match  = RegExp('[?&]q=([^&]*)').exec(window.location.search)
	var result = match && decodeURIComponent(match[1].replace(/\+/g, ' '))

	return is.null(result) ? '' : result

}





ENGRAM.eventBus
.on(message.PRESS_TYPEABLE, ({key}) => {
	ENGRAM.eventBus.fire(message.URL_UPDATE, getURL( ) + key)
})
.on(message.PRESS_BACKSPACE, ({key}) => {
	ENGRAM.eventBus.fire(message.URL_UPDATE, getURL( ).slice(0, -1))
})
.on(message.PRESS_ESCAPE, ({key}) => {
	ENGRAM.eventBus.fire(message.URL_UPDATE, '')
})





$( ( ) => ENGRAM.eventBus.fire( message.URL_UPDATE, getURL( )) )
