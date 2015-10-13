
"use strict"




var commons = require('./commons')





var imports = { }

imports.pocket = { }






var extractLink = $link => {

	if (is.undefined($link.attr('href'))) {

		commons.log.warningLow('link missing url', {
			link: $link[0].toString( )
		})

	}
	if (is.undefined($link.attr('time_added'))) {

		commons.log.warningLow('link missing time_added', {
			link: $link[0].toString( )
		})

	}

	return {
		url:   encodeURIComponent($link.attr('href')),
		ctime: $link.attr('time_added')
	}

}





imports.pocket.parse = data => {

	return $(data).find('a').map((ith, link) => {
		return extractLink($(link))
	})
	.sort((bookmark0, bookmark1) => {
		return bookmark0.ctime - bookmark1.ctime
	})

}



module.exports = imports

