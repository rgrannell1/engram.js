
"use strict"





var rest = require('../rest')




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

	}, '&#160;')





	buttons.share = m('a', {

		title: 'Share Link...',
		href:  rest.url.shareLink(model.url( )),
		target: '_blank'

	}, '&#x1f381;')

	buttons.archive = m('a', {

		title: 'Show Archive...',
		href:  rest.url.archiveLink(model.bookmarkId( )),
		class: 'archive',
		target: '_blank'

	}, '&#x1F5C3;')

	buttons.delete  = m('a', {
		title: 'Delete',
		href:  'javascript:void(0)',
		class: 'delete-bookmark',
		role:  'button'
	}, '&#x2716;')





	rows.info = m('li', [info.date])

	rows.links = m('li', [

		links.bookmark,
		seperator,
		links.host

	])

	rows.actions = m('li', [

		buttons.share,
		seperator,

		buttons.article,
		seperator,

		buttons.delete,
		seperator

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

	var model = { }

	Object.keys(data).forEach(prop => {
		model[prop] = m.prop(data[prop])
	})

	return {view: view.bind({ }, model, ctrl)}

}




module.exports = Bookmark
