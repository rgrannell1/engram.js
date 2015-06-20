"use strict";

ENGRAM.eventBus.on(EventBus.message.DELETE, function (_ref) {
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
}).on(EventBus.message.DELETE_SUCCESS, function (_ref) {
	var id = _ref.id;
	var _ = _ref._;

	ENGRAM.cache.remove(id);
}).on(EventBus.message.DELETE_SUCCESS, function (_ref) {
	var _ = _ref._;
	var $article = _ref.$article;

	$article.remove();
}).on(EventBus.message.DELETE_FAILURE, function (_ref) {
	var id = _ref.id;
	var $article = _ref.$article;

	alert("failed to remove bookmark #" + id);
	$article.show();
});