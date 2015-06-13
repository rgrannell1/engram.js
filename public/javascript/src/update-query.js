
"use strict"





var getURL = ( ) => {

	var match  = RegExp('[?&]q=([^&]*)').exec(window.location.search)
	var result = match && decodeURIComponent(match[1].replace(/\+/g, ' '))

	return is.null(result) ? '' : result

}





ENGRAM.eventBus
.on(':press-typeable', ({key}) => {
	ENGRAM.eventBus.fire( ':update-url', getURL( ) + key)
})
.on(':press-backspace', ({key}) => {
	ENGRAM.eventBus.fire(':update-url', getURL( ).slice(0, -1))
})
.on(':press-escape', ({key}) => {
	ENGRAM.eventBus.fire(':update-url', '')
})





$( ( ) => ENGRAM.eventBus.fire( ':update-url', getURL( )) )
