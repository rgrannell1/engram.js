
"use strict"






var constants = require('./constants')
var commons   = require('./commons')





var fs = { }




fs.readDataURL = (url, callback) => {

	fs.readDataURL.precond(url, callback)

	var ctype = 'data:text/html;base64,'

	if (!url.startsWith(ctype)) {
		commons.log.error('could not load URL', {url})
	} else {
		callback( atob(url.slice(ctype.length)) )
	}

}

fs.readDataURL.precond = (url, callback) => {

	is.always.string(url)
	is.always.function(callback)

}





fs.read = callback => {

	fs.read.precond(callback)

	var id = 'hidden-file-input'

	// -- append a hidden file to the document body,
	// -- to circumvent ineffective and annoying browser security.
	if ($('#' + id).length === 0) {

		$(`<input id=${id} type="file" style="opacity: 0">`).appendTo('body')
		$('#' + id).change(( ) => {

			var file   = $('#' + id).prop('files')[0]
			var reader = new FileReader( )

			reader.readAsDataURL(file)

			reader.onload = ( ) => {
				fs.readDataURL(reader.result, callback)
			}

		})

	}


	$('#' + id).trigger('click')

}

fs.read.precond = callback => {
	is.always.function(callback)
}


module.exports = fs
