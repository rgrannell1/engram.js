"use strict";

{
	var Router;

	(function () {

		var dispatchRoutes = function (routes, middleware) {

			var location = window.location;

			for (var ith = 0; ith < routes.length; ++ith) {
				var route;
				var isMatch;

				var _ret2 = (function (ith) {
					route = routes[ith];
					isMatch = route.pattern(location);

					if (isMatch) {

						middleware.forEach(function (response) {
							response(location);
						});

						route.response(location, function () {
							dispatchRoutes(routes.slice(ith + 1), middleware);
						});

						return {
							v: undefined
						};
					}
				})(ith);

				if (typeof _ret2 === "object") return _ret2.v;
			}
		};

		var onChange = function (callback) {

			var previous;

			setInterval(function () {

				if (previous !== window.location.href) {

					previous = window.location.href;

					callback();
				}
			}, 100);
		};

		Router = function Router() {

			var self = {
				routes: {
					onLoad: [],
					onChange: []
				},
				middleware: []
			};

			self.onLoad = function (pattern, response) {

				self.routes.onLoad.push({ pattern: pattern, response: response });

				return {
					routes: self.routes,
					middleware: self.middleware,

					onChange: self.onChange,
					onLoad: self.onLoad,
					use: self.use,

					run: self.run
				};
			};

			self.onChange = function (pattern, response) {

				self.routes.onChange.push({ pattern: pattern, response: response });

				return {
					routes: self.routes,
					middleware: self.middleware,

					onChange: self.onChange,
					onLoad: self.onLoad,
					use: self.use,

					run: self.run
				};
			};

			self.use = function (response) {

				self.middleware.push(response);

				return {
					routes: self.routes,
					middleware: self.middleware,

					onChange: self.onChange,
					onLoad: self.onLoad,
					use: self.use,

					run: self.run
				};
			};

			self.run = function () {

				window.onload = function () {
					dispatchRoutes(self.routes.onLoad, self.middleware);
				};

				onChange(function () {
					dispatchRoutes(self.routes.onChange, self.middleware);
				});
			};

			return self;
		};
	})();
}