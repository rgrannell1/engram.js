
"use strict"





var commons      = require('../commons')
var BookmarkList = require('./bookmark-list')
var Sidebar      = require('./sidebar')





var view = ctrl => {


	// todo pass in Sidebar, Bookmark objects.
	return m('main', [
		BookmarkList(ctrl.model.bookmarks( )).view( ),
		Sidebar(ctrl.model.sidebar( )).view( )
	])

}





var Page = data => {

	Page.precond(data)

	var ctrl = {
		model: commons.mithril.propObj(data)
	}

	return {
		view: view.bind({ }, ctrl),
		ctrl
	}

}

Page.precond = data => {

	is.always.object(data)

	commons.assert.hasProperties(['sidebar', 'bookmarks'], data)

}




module.exports = Page
