
"use strict"





var constants = require('./constants')





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





fs.read = callback => {

	commons.dom.onElem(constants.selectors.UPLOAD_FORM, hasFiles, elem => {

		var file   = elem.getAttribute('files')[0]
		var reader = new FileReader( )

		reader.readAsDataURL(file)

		reader.onload = ( ) => {

			fs.readDataUrl(reader.result, url => {
				fs.readDataURL(url, callback)
			})

		}

	})

}


module.exports = fs
