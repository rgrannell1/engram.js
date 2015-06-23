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