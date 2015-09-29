
"use strict"





var rest      = require('../rest')
var commons   = require('../commons')
var constants = require('../constants')





var view = (model, ctrl) => {

	var rows = [

		m('li', [
			view.bookmarkLink(model),
			view.seperator( ),
			view.hostLink(model)
		]),
		m('li', [view.date(model)] ),
		m('li', [

			view.shareButton(model),
			view.seperator( ),
			view.archiveButton(model),
			view.seperator( ),
			view.deleteButton(model, ctrl)

		])

	]

	var articleProperties = {

		class: `bookmarkId`,
		id:    model.bookmarkId( )

	}

	return m('article', articleProperties, [
		m('ul', rows)
	])

}





view.date = model => {

	var tidyDate = commons.date.formatInterval.ms(new Date( ), model.date( ))

	return m('time', {

		title: commons.date.formatDate(model.date( ))

	}, tidyDate)

}




view.bookmarkLink = model => {

	return m('a', {

		href: model.url( ),
		rel:  'external noreferrer'

	}, model.displayTitle( ))

}

view.hostLink = model => {

	return m('a', {

		href:  model.hosturl( ),
		class: 'hosturl',
		rel:   'external noreferrer'

	}, model.hostname( ))

}





view.seperator = ( ) => {
	return m('span', {class: 'seperator'}, '|')
}





view.deleteButton = (model, ctrl) => {

	return m('a', {

		title: 'Delete',
		href:  'javascript:void(0)',
		class: 'delete-bookmark',
		role:  'button',
		click: ctrl.deleteBookmark.bind({ }, model)

	}, constants.unicode.HEAVY_MULTIPLICATION)

}

view.archiveButton = model => {

	return m('a', {

		title: 'Show Archive...',
		href:  rest.url.archiveLink(model.bookmarkId( )),
		class: 'archive',
		target: '_blank'

	}, constants.unicode.CARD_FILE_BOX)

}

view.shareButton = model => {

	return m('a', {

		title: 'Share Link...',
		href:  rest.url.shareLink(model.url( )),
		target: '_blank'

	}, constants.unicode.WRAPPED_PRESENT)

}





var Bookmark = data => {

	var ctrl = { }

	ctrl.deleteBookmark = model => {
		// -- unload this resource, delete from server using service.
	}





	return {
		view: view.bind({ }, commons.mithril.propObj(data), ctrl),
		ctrl
	}

}





module.exports = Bookmark
