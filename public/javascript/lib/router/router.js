"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

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

		var onLocationChange = function (callback) {

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
				middleware: [] };

			var onLoad = (function (_onLoad) {
				var _onLoadWrapper = function onLoad(_x, _x2) {
					return _onLoad.apply(this, arguments);
				};

				_onLoadWrapper.toString = function () {
					return _onLoad.toString();
				};

				return _onLoadWrapper;
			})(function (pattern, response) {

				self.routes.onLoad.push({ pattern: pattern, response: response });

				return {
					routes: self.routes,
					middleware: self.middleware,

					onChange: onChange,
					onLoad: onLoad,
					use: use,

					run: run
				};
			});

			var onChange = (function (_onChange) {
				var _onChangeWrapper = function onChange(_x, _x2) {
					return _onChange.apply(this, arguments);
				};

				_onChangeWrapper.toString = function () {
					return _onChange.toString();
				};

				return _onChangeWrapper;
			})(function (pattern, response) {

				self.routes.onChange.push({ pattern: pattern, response: response });

				return {
					routes: self.routes,
					middleware: self.middleware,

					onChange: onChange,
					onLoad: onLoad,
					use: use,

					run: run
				};
			});

			var use = (function (_use) {
				var _useWrapper = function use(_x) {
					return _use.apply(this, arguments);
				};

				_useWrapper.toString = function () {
					return _use.toString();
				};

				return _useWrapper;
			})(function (response) {

				self.middleware.push(response);

				return {
					routes: self.routes,
					middleware: self.middleware,

					onChange: onChange,
					onLoad: onLoad,
					use: use,

					run: run
				};
			});

			var run = function run() {

				$(function () {
					dispatchRoutes(self.routes.onLoad, self.middleware);
				});

				onLocationChange(function () {
					dispatchRoutes(self.routes.onChange, self.middleware);
				});
			};

			self.onLoad = onLoad;
			self.onChange = onChange;

			self.use = use;
			self.run = run;

			return self;
		};
	})();
}

var QueryIterator = (function () {
	function QueryIterator(path) {
		_classCallCheck(this, QueryIterator);

		this.data = parsePath(path);

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

		var parsePath = function (path) {

			var data = {};

			return data;
		};

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
	})();
}