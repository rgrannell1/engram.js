"use strict"





var deleteBookmark = ({id, $button}) => {

	var $article = $button.closest('article')

	$article.hide(ENGRAM.DELETEFADE)

	$.ajax({
		url: `/api/bookmarks/${id}`,
		type: 'DELETE',
		success: data => {
			ENGRAM.eventBus.fire(EventBus.message.DELETE_SUCCESS, {id, $article})
		},
		error: () => {
			ENGRAM.eventBus.fire(EventBus.message.DELETE_FAILURE, {id, $article})
		}
	})

}

var onDelete = {
	success: ({id, _}) => {

		ENGRAM.cache.remove(id)
		$article.remove( )

	},
	failure: ({id, $article})=> {

		alert(`failed to remove bookmark #${id}`)
		$article.show( )

	}
}





ENGRAM.eventBus
.on(EventBus.message.DELETE, deleteBookmark)





ENGRAM.eventBus
.on(EventBus.message.DELETE_SUCCESS, onDelete.success)
.on(EventBus.message.DELETE_SUCCESS, onDelete.failure)

.on(EventBus.message.DELETE_FAILURE, onDelete.failure)
