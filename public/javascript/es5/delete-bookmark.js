"use strict";

var deleteBookmark = function (_ref) {
	var id = _ref.id;
	var $button = _ref.$button;

	var $article = $button.closest("article");

	$article.hide(ENGRAM.DELETEFADE);

	$.ajax({
		url: "/api/bookmarks/" + id,
		type: "DELETE",
		success: function (data) {
			ENGRAM.eventBus.fire(EventBus.message.DELETE_SUCCESS, { id: id, $article: $article });
		},
		error: function () {
			ENGRAM.eventBus.fire(EventBus.message.DELETE_FAILURE, { id: id, $article: $article });
		}
	});
};

var onDelete = {
	success: function (_ref) {
		var id = _ref.id;
		var _ = _ref._;

		ENGRAM.cache.remove(id);
		$article.remove();
	},
	failure: function (_ref) {
		var id = _ref.id;
		var $article = _ref.$article;

		alert("failed to remove bookmark #" + id);
		$article.show();
	}
};

ENGRAM.eventBus.on(EventBus.message.DELETE, deleteBookmark);

ENGRAM.eventBus.on(EventBus.message.DELETE_SUCCESS, onDelete.success).on(EventBus.message.DELETE_SUCCESS, onDelete.failure).on(EventBus.message.DELETE_FAILURE, onDelete.failure);