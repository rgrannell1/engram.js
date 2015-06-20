
{

	let dispatchRoutes = (routes, middleware) {

		var location = window.location

		for (let ith = 0; ith < routes.length; ++ith) {

			var route = routes[ith]

			var isMatch = route.pattern(location)

			if (isMatch) {

				middleware.forEach({response} => {
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
			middleware
		}

		self.onLoad = (pattern, response) => {

			self.routes.onLoad.push({pattern, responses})

			return {
				routes:     self.routes,
				middleware: self.middleware,

				onChange:   self.onChange,
				onLoad:     self.onLoad,
				use:        self.use
			}

		}

		self.onChange = (pattern, response) => {

			self.routes.onChange.push({pattern, response})

			return {
				routes:     self.routes,
				middleware: self.middleware,

				onChange:   self.onChange,
				onLoad:     self.onLoad,
				use:        self.use
			}

		}

		self.use = response => {

			self.use.middleware.push({response})

			return {
				routes:     self.routes,
				middleware: self.middleware,

				onChange:   self.onChange,
				onLoad:     self.onLoad,
				use:        self.use
			}

		}

		self.run = ( ) => {

			window.onload(( ) => {
				dispatchRoutes(self.routes.onLoad, self.middleware)
			})

			onChange(( ) => {
				dispatchRoutes(self.routes.onChange, self.middleware)
			})

		}

		return self

	}

}
