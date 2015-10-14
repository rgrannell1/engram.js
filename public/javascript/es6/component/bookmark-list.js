
"use strict"





var commons   = require('../commons')
var constants = require('../constants')
var Bookmark  = require('./bookmark')





var view = ctrl => {

	var bounds   = { }

	bounds.lower = ctrl.model.page * constants.view.VISIBLE_BOOKMARKS
	bounds.upper = bounds.lower   += constants.view.VISIBLE_BOOKMARKS

	var toView = ctrl.model.bookmarks.slice(bounds.lower, bounds.upper)

	return m('section', {id: 'bookmarks'}, [
		m('section', {id: 'bokmark-container'},
			toView.map(Bookmark).map(commons.mithril.invokeView))
	])

}





var BookmarkList = ({bookmarks, page}) => {

	BookmarkList.precond(bookmarks, page)

	// -- need to allow updates to slice shown,
	// -- bookmarks stored, mithril rendering.

	var maxId = commons.data.array.maxBy(commons.data.string.pluck('bookmarkId'), bookmarks)

	// -- add ordering function, slicing function.

	var ctrl  = {
		model: {bookmarks, page}
	}

	return {
		view: view.bind({ }, ctrl),
		ctrl
	}

}

BookmarkList.precond = (bookmarks, page) => {

	is.always.array(bookmarks)
	is.always.number(page)

	commons.assert.isTrue(page === page, 'page was NaN')
	commons.assert.isTrue(page >=  0,    'page was negative')

	bookmarks.forEach(Bookmark.precond)

}





module.exports = BookmarkList
