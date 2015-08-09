"use strict";

var listeners = {};

{
	(function () {

		var eventCode = {
			escape: 27,
			backspace: 8
		};

		var isTypeable = function isTypeable(event) {

			var key = String.fromCharCode(event.keyCode);

			return event.keyCode >= 41 && event.keyCode < 122 || (event.keyCode == 32 || event.keyCode > 186);
		};

		var $window = $(window);

		// -- broadcast keystrokes.

		listeners.rebroadcastKeyEvents = function () {

			$window.keypress(function (event) {

				if (isTypeable(event) && !event.ctrlKey && !event.altKey) {

					ENGRAM.eventBus.fire(EventBus.message.PRESS_TYPEABLE, {
						key: String.fromCharCode(event.which)
					});
				}
			});

			$window.keydown(function (event) {

				var keyCode = event.keyCode;

				if (event.keyCode === eventCode.escape) {

					ENGRAM.eventBus.fire(EventBus.message.PRESS_ESCAPE);
				} else if (event.keyCode === eventCode.backspace) {

					event.preventDefault();
					ENGRAM.eventBus.fire(EventBus.message.PRESS_BACKSPACE);
				}
			});
		};
	})();
}

{
	(function () {

		var $document = $(document);

		// -- broadcast when the user clicks a delete (X) button.

		listeners.deleteBookmark = function () {

			$document.on('click', ENGRAM.selectors.DELETE_BUTTONS, function () {

				var $button = $(this);

				var $article = $button.closest('article');
				var id = parseInt($article.attr('id'), 10);

				ENGRAM.eventBus.fire(EventBus.message.DELETE, { id: id, $button: $button });
			});
		};
	})();
}

{
	(function () {

		var $window = $(window);
		var $document = $(document);
		var scrollTimer = undefined;

		// -- broadcast every time the user scrolls (inefficient).

		listeners.onScroll = function () {

			$window.on('scroll', function () {

				var windowTop = $window.scrollTop();

				ENGRAM.eventBus.fire(EventBus.message.SCROLL, {

					windowTop: windowTop,
					scrollHeight: $document.height(),
					scrollPosition: $window.height() + windowTop

				});
			});
		};

		// -- broadcast every time the user stops scrolling (efficient).

		listeners.onStop = function () {

			ENGRAM.eventBus.on(EventBus.message.SCROLL, function (scrollData) {

				clearTimeout(scrollTimer);

				scrollTimer = setTimeout(function () {
					ENGRAM.eventBus.fire(EventBus.message.STOP, scrollData);
				}, 10);
			});
		};
	})();
}
