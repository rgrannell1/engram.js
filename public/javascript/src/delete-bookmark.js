"use strict"





ENGRAM.eventBus
.on(message.DELETE, ({id, $button}) => {

	var $article = $button.closest('article')

	$article.hide(ENGRAM.DELETEFADE)

	$.ajax({
		url: `/api/bookmarks/${id}`,
		type: 'DELETE',
		success: data => {
			ENGRAM.eventBus.fire(message.DELETE_SUCCESS, {id, $article})
		},
		error: () => {
			ENGRAM.eventBus.fire(message.DELETE_FAILURE, {id, $article})
		}
	})

})
.on(message.DELETE_SUCCESS, ({id, _}) => {
	ENGRAM.cache.remove(id)
})
.on(message.DELETE_SUCCESS, ({_, $article}) => {
	$article.remove( )
})
.on(message.DELETE_FAILURE, ({id, $article}) => {

	alert(`failed to remove bookmark #${id}`)
	$article.show( )

})
