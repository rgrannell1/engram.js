
"use strict"





var rest      = require('../rest')
var commons   = require('../commons')
var constants = require('../constants')





var view = ctrl => {

	var rows  = [

		m('li', [
			view.bookmarkLink(ctrl),
			view.seperator( ),
			view.hostLink(ctrl)
		]),
		m('li', [view.date(ctrl)] ),
		m('li', [

			view.shareButton(ctrl),
			view.seperator( ),
			view.archiveButton(ctrl),
			view.seperator( ),
			view.deleteButton(ctrl)

		])

	]

	var articleProperties = {

		class: `bookmarkId`,
		id:    ctrl.model.bookmarkId

	}

	return m('article', articleProperties, [
		m('ul', rows)
	])

}





view.date = ctrl => {

	var cdate    = new Date(ctrl.model.ctime * constants.date.S_IN_MS)
	var tidyDate = commons.date.formatInterval.ms(new Date( ), cdate)

	return m('time', {
		title: commons.date.formatDate(cdate)
	}, tidyDate)

}




view.bookmarkLink = ctrl => {

	return m('a', {

		href: ctrl.model.url,
		rel:  'external noreferrer'

	}, ctrl.model.title)

}

view.hostLink = ctrl => {

	return m('a', {

		href:  ctrl.model.hosturl,
		class: 'hosturl',
		rel:   'external noreferrer'

	}, ctrl.model.hostname)

}





view.seperator = ( ) => {
	return m('span', {class: 'seperator'}, '|')
}





view.deleteButton = ctrl => {

	// -- hide bookmark on click, remove from bookmarks list.

	return m('a', {

		title: 'Delete',
		href:  'javascript:void(0)',
		class: 'delete-bookmark',
		role:  'button',

		onclick: ( ) => {

			rest.deleteBookmark(
				ctrl.model.bookmarkId,
				( ) => {
					commons.log.summary('deleted bookmark', {
						id: ctrl.model.bookmarkId
					})
				},
				( ) => {
					commons.log.error('failed to remove bookmark', {
						id: ctrl.model.bookmarkId
					})
				}
			)

		}

	}, constants.unicode.HEAVY_MULTIPLICATION)

}

view.archiveButton = ctrl => {

	return m('a', {

		title: 'Show Archive...',
		href:  rest.url.archiveLink(ctrl.model.bookmarkId),
		class: 'archive',
		target: '_blank'

	}, constants.unicode.CARD_FILE_BOX)

}

view.shareButton = ctrl => {

	return m('a', {

		title: 'Share Link...',
		href:  rest.url.shareLink(ctrl.model.url),
		target: '_blank'

	}, constants.unicode.WRAPPED_PRESENT)

}





var Bookmark = data => {

	Bookmark.precond(data)

	var ctrl = {
		model: data
	}

	return {
		view: view.bind({ }, ctrl),
		ctrl
	}

}

Bookmark.precond = data => {

	is.always.object(data)

	commons.assert.hasProperties([
		'bookmarkId',
		'ctime',
		'hostname',
		'hosturl',
		'title',
		'url',
	], data)

}




module.exports = Bookmark
