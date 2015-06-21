"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

{
	var Router;
	var qroute;

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

		qroute = {};
	})();
}

var QueryIterator = (function () {
	function QueryIterator(location) {
		_classCallCheck(this, QueryIterator);

		this.data = {};

		return this;
	}

	_prototypeProperties(QueryIterator, null, {
		hasNext: {
			value: function hasNext(selector) {},
			writable: true,
			configurable: true
		},
		peekNext: {
			value: function peekNext(selector) {},
			writable: true,
			configurable: true
		},
		getNext: {
			value: function getNext(selector) {},
			writable: true,
			configurable: true
		}
	});

	return QueryIterator;
})();

{
	var use;

	(function () {
		var SELECTORS = ["path", "paths", "dirname", "basename", "rawPaths", "rest", "hash", "rawQuery", "rawQueryParams", "rawQueryParam", "queryParams", "queryParam"];

		var buildSelector = function (selector) {
			return function (predicate) {
				return predicate.call(undefined, undefined.getNext(selector));
			};
		};

		var where = {};

		SELECTORS.forEach(function (selector) {
			where.selector = buildSelector(selector);
		});

		use = {};

		use.self = function (context) {};

		use.location = function (location) {};

		use.self(undefined).path;
	})();
}