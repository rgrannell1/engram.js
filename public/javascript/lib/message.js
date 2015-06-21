"use strict";

{

	var ith = 0;

	EventBus.message = {
		UPDATED_URL: ++ith,
		URL_UPDATE: ++ith,
		DELETE_SUCCESS: ++ith,
		DELETE_FAILURE: ++ith,
		REDRAW: ++ith,
		UPDATE_FOCUS: ++ith,
		DELETE: ++ith,

		PRESS_ESCAPE: ++ith,
		PRESS_BACKSPACE: ++ith,
		PRESS_TYPEABLE: ++ith,
		SCROLL: ++ith,
		STOP: ++ith,
		UPDATE_CACHE: ++ith,
		LOADED_BOOKMARKS: ++ith,
		LOAD_BOOKMARK: ++ith,
		RESCORE: ++ith,
		HASH_ID: ++ith

	};
}