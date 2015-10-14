
"use strict"





var listener  = { }

var $window   = $(window)
var $document = $(document)





listener.onScroll = callback => {


	$window.on('scroll', ( ) => {

		var windowTop = $window.scrollTop( )

		callback({
			windowTop:      windowTop,
			scrollHeight:   $(document).height( ),
			scrollPosition: $(window).height( ) + windowTop
		})

	})

}

listener.atPageBottom = ({windowTop, scrollHeight, scrollPosition}, callback) => {

	if (scrollHeight - scrollPosition === 0) {
		callback( )
	}

}

listener.atPageTop = ({windowTop, scrollHeight, scrollPosition}, callback) => {

	if (windowTop === 0) {
		callback( )
	}

}





module.exports = listener
