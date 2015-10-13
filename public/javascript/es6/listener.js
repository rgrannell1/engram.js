
"use strict"





var $window  = $(window)
var listener = { }





listener.onScroll = callback => {

	var windowTop = $window.scrollTop( )

	$window.on('scroll', ( ) => {

		callback({
			windowTop:      windowTop,
			scrollHeight:   $document.height( ),
			scrollPosition: $window.height( ) + windowTop
		})

	})

}

listener.atPageTop = ({windowTop, scrollHeight, scrollPosition}, callback) => {

	if (scrollHeight - scrollPosition === 0) {
		callback( )
	}

}

listener.atPageBottom = ({windowTop, scrollHeight, scrollPosition}, callback) => {

	if (windowTop === 0) {
		callback( )
	}

}





module.exports = listener
