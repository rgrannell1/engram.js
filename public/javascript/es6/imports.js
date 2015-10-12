
"use strict"




var commons = require('./commons')





var imports = { }

imports.pocket = { }






var extractPocketLink = $link => {

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

	$(data).find('a').map((ith, link) => {
		return extractPocketLink($(link))
	})
	.sort((bookmark0, bookmark1) => {
		bookmark0.ctime - bookmark1.ctime
	})

}



module.exports = imports

