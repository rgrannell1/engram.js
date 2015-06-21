
{

	let dispatchRoutes = (routes, middleware) => {

		var location = window.location

		for (let ith = 0; ith < routes.length; ++ith) {

			var route = routes[ith]

			var isMatch = route.pattern(location)

			if (isMatch) {

				middleware.forEach(response => {
					response(location)
				})

				route.response(location, ( ) => {
					dispatchRoutes(routes.slice(ith + 1), middleware)
				})

				return

			}

		}

	}

	let onLocationChange = callback => {

		var previous

		setInterval(( ) => {

			if (previous !== window.location.href) {

				previous = window.location.href

				callback( )

			}

		}, 100)

	}





	var Router = function ( ) {

		var self = {
			routes: {
				onLoad:   [ ],
				onChange: [ ]
			},
			middleware:   [ ],

		}





		var onLoad = function (pattern, response) {

			self.routes.onLoad.push({pattern, response})

			return {
				routes:     self.routes,
				middleware: self.middleware,

				onChange:   onChange,
				onLoad:     onLoad,
				use:        use,

				run:        run
			}

		}

		var onChange = function (pattern, response) {

			self.routes.onChange.push({pattern, response})

			return {
				routes:     self.routes,
				middleware: self.middleware,

				onChange:   onChange,
				onLoad:     onLoad,
				use:        use,

				run:        run
			}

		}

		var use = function (response) {

			self.middleware.push(response)

			return {
				routes:     self.routes,
				middleware: self.middleware,

				onChange:   onChange,
				onLoad:     onLoad,
				use:        use,

				run:        run
			}

		}

		var run = function ( ) {

			$(( ) => {
				dispatchRoutes(self.routes.onLoad, self.middleware)
			})

			onLocationChange(( ) => {
				dispatchRoutes(self.routes.onChange, self.middleware)
			})

		}




		self.onLoad   = onLoad
		self.onChange = onChange

		self.use      = use
		self.run      = run

		return self

	}

}






class QueryIterator {

	constructor(path) {

		this.data = parsePath(path)

		return this

	}

	hasNext(selector) {

	}

	peekNext(selector) {

	}

	getNext(selector) {

	}

}




{

	let parsePath = path => {

		var data = { }



		return data

	}






	let SELECTORS = [
		'path', 'paths', 'dirname', 'basename', 'rawPaths',
		'rest',
		'hash',
		'rawQuery', 'rawQueryParams', 'rawQueryParam', 'queryParams', 'queryParam'
	]

	let buildSelector = selector => {
		return predicate => {
			return predicate.call(this, this.getNext(selector))
		}
	}





	let where = { }

	SELECTORS.forEach(selector => {
		where.selector = buildSelector(selector)
	})





	var use = { }

	use.self = context => {

	}

	use.location = location => {

	}

}