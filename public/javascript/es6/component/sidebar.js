
"use strict"





var fs      = require('../fs')
var rest    = require('../rest')
var commons = require('../commons')
var imports = require('../imports')





var view = ctrl => {

	return m('section', {id: 'navbar'}, [
		m('nav', [
			m('ul', [
				m('li', [view.import(ctrl)] ),
				m('li', [view.export(ctrl)] )
			])
		])

	])

}

view.import = ctrl => {
	return m('a', {

		id:      'upload',
		style:   'cursor: pointer',
		onclick: fs.read.bind({ }, data => {

			var formatted = imports.pocket.parse(data)

			rest.import.pocket(
				formatted,
				( ) => {

					commons.log.summary('successfully imported pocket bookmarks.', {
						number: formatted.length
					})

				},
				( ) => {

					commons.log.error('failed to import pocket bookmarks.', {
						number: formatted.length
					})

				}
			)

		})

	}, 'Import')
}

view.export = ctrl => {
	return m('a', {
		id:    'export',
		style: 'cursor: pointer'
	}, 'Export')
}





var Sidebar = data => {

	Sidebar.precond(data)

	var ctrl = {
		model: { }
	}

	return {
		view: view.bind({ }, ctrl),
		ctrl
	}

}

Sidebar.precond = data => {

}





module.exports = Sidebar
