
"use strict"





var commons   = require('../commons')
var constants = require('../constants')
var Bookmark  = require('./bookmark')





var view = ctrl => {

	return m('section', {id: 'bookmarks'}, [
		m('section', {id: 'bokmark-container'},
			ctrl.model.bookmarks( ).map(Bookmark).map(commons.mithril.invokeView))
	])

}





var BookmarkList = bookmarks => {

	// -- need to allow updates to slice shown,
	// -- bookmarks stored, mithril rendering.

	var maxId = commons.data.array.maxBy(commons.data.string.pluck('bookmarkId'), bookmarks)

	// -- add ordering function, slicing function.

	var ctrl  = {
		model: {
			bookmarks: m.prop(bookmarks),
			slice:     {
				lower: maxId - constants.view.VISIBLE_BOOKMARKS,
				upper: maxId
			}
		},
		add: bookmark => {
			ctrl.model.bookmarks( ).push(bookmark)
			m.redraw.strategy('diff')
		}
	}

	return {
		view: view.bind({ }, ctrl),
		ctrl
	}

}





module.exports = BookmarkList
