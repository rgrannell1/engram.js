
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

	// -- append a hidden file to the document body,
	// -- to circumvent ineffective and annoying browser security.
	if ($('#' + id).length === 0) {

		$('<input id=' + id + ' type="file">').appendTo('body')
		$('#' + id).change(( ) => {

			var file   = $('#' + id).prop('files')[0]
			var reader = new FileReader( )

			reader.readAsDataURL(file)

			reader.onload = ( ) => {

				fs.readDataURL(reader.result, url => {
					fs.readDataURL(url, callback)
				})

			}

		})

	}


	$('#' + id).trigger('click')

}


module.exports = fs
