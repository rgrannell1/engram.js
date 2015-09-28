
"use strict"





var rest    = require('../rest')
var commons = require('../commons')




var view = model => {

	var buttons = { }
	var links   = { }
	var info    = { }
	var rows    = { }




	var seperator = m('span', {class: 'seperator'}, '|')





	links.bookmark = m('a', {

		href: model.url( ),
		rel:  'external noreferrer'

	}, model.displayTitle( ))

	links.host = m('a', {

		href:  model.hosturl( ),
		class: 'hosturl',
		rel:   'external noreferrer'

	}, model.hostname( ))





	info.date = m('time', {

		title: model.date( )

	}, model.date( ))





	buttons.share = m('a', {

		title: 'Share Link...',
		href:  rest.url.shareLink(model.url( )),
		target: '_blank'

	}, '🎁 ')

	buttons.archive = m('a', {

		title: 'Show Archive...',
		href:  rest.url.archiveLink(model.bookmarkId( )),
		class: 'archive',
		target: '_blank'

	}, '🎁 ')

	buttons.delete  = m('a', {
		title: 'Delete',
		href:  'javascript:void(0)',
		class: 'delete-bookmark',
		role:  'button'
	}, String.fromCharCode(10006))





	rows.info = m('li', [info.date])

	rows.links = m('li', [

		links.bookmark,
		seperator,
		links.host

	])

	rows.actions = m('li', [

		buttons.share,
		seperator,

		buttons.archive,
		seperator,

		buttons.delete

	])





	var elem = m('article', {

		class: `bookmarkId`,
		id:    model.bookmarkId( )

	}, [
		m('ul', [rows.links, rows.info, rows.actions])
	])

	return elem

}

var ctrl = ( ) => {

}





var Bookmark = data => {
	return {
		view: view.bind({ }, commons.mithril.propObj(data)),
		ctrl
	}
}





module.exports = Bookmark
