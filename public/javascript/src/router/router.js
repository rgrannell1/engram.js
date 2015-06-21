
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

	let onChange = callback => {

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
				onLoad:     [ ],
				onChange:   [ ]
			},
			middleware: [ ]
		}

		self.onLoad = (pattern, response) => {

			self.routes.onLoad.push({pattern, response})

			return {
				routes:     self.routes,
				middleware: self.middleware,

				onChange:   self.onChange,
				onLoad:     self.onLoad,
				use:        self.use,

				run:        self.run
			}

		}

		self.onChange = (pattern, response) => {

			self.routes.onChange.push({pattern, response})

			return {
				routes:     self.routes,
				middleware: self.middleware,

				onChange:   self.onChange,
				onLoad:     self.onLoad,
				use:        self.use,

				run:        self.run
			}

		}

		self.use = response => {

			self.middleware.push(response)

			return {
				routes:     self.routes,
				middleware: self.middleware,

				onChange:   self.onChange,
				onLoad:     self.onLoad,
				use:        self.use,

				run:        self.run
			}

		}

		self.run = ( ) => {

			window.onload = ( ) => {
				dispatchRoutes(self.routes.onLoad, self.middleware)
			}

			onChange(( ) => {
				dispatchRoutes(self.routes.onChange, self.middleware)
			})

		}

		return self

	}





	var qroute = { }


}






class QueryIterator {

	constructor(location) {

		this.data = {

		}

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

	use.self(this).path

}