
"use strict"






var constants = require('./constants')
var commons   = require('./commons')





var fs = { }




fs.readDataURL = (url, callback) => {

	var dataURLContentType = 'data:text/html;base64,'

	if (!url.startsWith(dataURLContentType)) {
		commons.log.error('could not load URL')
	} else {
		callback( atob(url.slice(dataURLContentType.length)) )
	}

}





var hasFiles = elem => {
	return !is.undefined(elem.getAttribute('files'))
}





fs.read = (callback, event) => {

	var id = 'hidden-file-input'

	if ($('#' + id).length === 0) {
		// -- append a hidden file to the document body,
		// -- to circumvent ineffective and annoying browser security.

		$('<input id=' + id + ' type="file">').appendTo('body')

	}

	$('#' + id).one(( ) => {
		callback( )
	})

	$('#' + id).trigger('click')


	// ~~ trigger click.
	// set callback of other element
	// set click.

	var file   = elem.getAttribute('files')[0]
	var reader = new FileReader( )

	reader.readAsDataURL(file)

	reader.onload = ( ) => {

		fs.readDataUrl(reader.result, url => {
			fs.readDataURL(url, callback)
		})

	}


}


module.exports = fs
