
"use strict"





var fs      = require('../fs')
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

		href:    '',
		id:      'upload',
		onclick: fs.read.bind({ }, data => {
			imports.pocket.parse(data)
		})

	}, 'Import')
}

view.export = ctrl => {
	return m('a', {href: '', id: 'export'}, 'Export')
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
