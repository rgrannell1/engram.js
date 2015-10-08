
"use strict"









var imports = { }

imports.pocket = { }






var extractPocketLink = link => {

	if (is.undefined(link.url)) {
		commons.log.warning('link missing url')
	}
	if (is.undefined(link.ctime)) {
		commons.log.warning('link missing ctime')
	}

	return {
		url:   encodeURIComponent(link.url),
		ctime: link.ctime
	}

}





imports.pocket.parse = data => {

	$(data).find('a').map((ith, link) => {
		extractPocketLink(link)
	})
	.sort((bookmark0, bookmark1) => {
		bookmark0.ctime - bookmark1.ctime
	})

}



module.exports = imports

