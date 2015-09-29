
"use strict"





var commons   = require('../commons')
var constants = require('../constants')
var Bookmark  = require('./bookmark')





var view = ctrl => {

	return m('section', {id: 'bookmarks'}, [
		m('section', {id: 'bokmark-container'},
			ctrl.model( ).map(Bookmark).map(commons.mithril.invokeView))
	])

}





var BookmarkList = bookmarks => {

	// -- need to allow updates to slice shown,
	// -- bookmarks stored, mithril rendering.

	var maxId = commons.data.array.maxBy(commons.data.string.pluck('bookmarkId'))

	var ctrl  = {
		model: {
			bookmarks: m.prop(bookmarks),
			slice:     {
				lower: maxId - constants.view.VISIBLE_BOOKMARKS,
				upper: maxId
			}
		},
		add: bookmark => {
			ctrl.model.bookmarks.push(bookmarks)
			m.redraw.strategy()
		}
	}

	return {
		view: view.bind({ }, ctrl),
		ctrl
	}

}





module.exports = BookmarkList
