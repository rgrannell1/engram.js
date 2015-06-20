
"use strict"





var getURL = ( ) => {

	var match  = RegExp('[?&]q=([^&]*)').exec(window.location.search)
	var result = match && decodeURIComponent(match[1].replace(/\+/g, ' '))

	return is.null(result) ? '' : result

}





ENGRAM.eventBus
.on(EventBus.message.PRESS_TYPEABLE, ({key}) => {
	ENGRAM.eventBus.fire(EventBus.message.URL_UPDATE, getURL( ) + key)
})
.on(EventBus.message.PRESS_BACKSPACE, ({key}) => {
	ENGRAM.eventBus.fire(EventBus.message.URL_UPDATE, getURL( ).slice(0, -1))
})
.on(EventBus.message.PRESS_ESCAPE, ({key}) => {
	ENGRAM.eventBus.fire(EventBus.message.URL_UPDATE, '')
})





$( ( ) => ENGRAM.eventBus.fire( EventBus.message.URL_UPDATE, getURL( )) )
