"use strict";

{

	EventBus.message = {};["UPDATED_URL", "URL_UPDATE", "DELETE_SUCCESS", "DELETE_FAILURE", "REDRAW", "UPDATE_FOCUS", "DELETE", "PRESS_ESCAPE", "PRESS_BACKSPACE", "PRESS_TYPEABLE", "SCROLL", "STOP", "UPDATE_CACHE", "LOADED_BOOKMARKS", "LOAD_BOOKMARK", "RESCORE", "HASH_ID"].forEach(function (name, ith) {
		EventBus.message[name] = ith + "";
	});
}