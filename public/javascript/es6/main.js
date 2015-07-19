
"use strict"





{

	var loadState = [new Date(0), new Date(0)]

	let loadList = (downwards, from) => {

		var lastLoadIth = downwards ? 0 : 1

		var now = new Date( )

		if (now - loadState[lastLoadIth] < 150) {
			return
		} else {
			loadState[lastLoadIth] = now
		}

		var loaded = (downwards ? listDown : listUp)(from, ENGRAM.PERSCROLL)

		ENGRAM.inFocus.setFocus({

			value: downwards
				? ENGRAM.inFocus.value.concat(loaded).slice(-ENGRAM.MAXLOADED)
				: loaded.concat(ENGRAM.inFocus.value).slice(0, +ENGRAM.MAXLOADED),

			currentQuery: ''
		})





		var bookmark = downwards
			? $('#bookmarks article').slice(-1)[0]
			: $('#bookmarks article').slice(0, 1)[0]

		var originalOffset = bookmark.getBoundingClientRect( ).top
		var id             = $(bookmark).attr('id')





		ENGRAM.eventBus.fire(EventBus.message.LOADED_BOOKMARKS, {originalOffset, id})

	}





	var loadListDown = loadList.bind({ }, true)
	var loadListUp   = loadList.bind({ }, false)

}





var fillBookmarks = ( ) => {

	var currentAmount = ENGRAM.inFocus.value.length
	var stillUnloaded = getURL( ) === '' && currentAmount !== ENGRAM.MAXLOADED

	if (!stillUnloaded) {
		return
	}

	var from   = $('#bookmark-container article').length === 0
		? ENGRAM.BIGINT
		: parseInt($('#bookmark-container article:last').attr('id'), 10)

	var loaded = listDown(from, ENGRAM.MAXLOADED - currentAmount)

	if (loaded.length > 0) {

		ENGRAM.inFocus.setFocus({
			value:        ENGRAM.inFocus.value.concat(loaded),
			currentQuery: ''
		})

	}

}





var triggerLoad = (downwards) => {

	if (getURL( ) === '') {
		// -- load linearly by id up or down.

		var topic = ':scroll' + (downwards ? 'down' : 'up')  + '-bookmarks'

		ENGRAM.eventBus.fire(topic, getNextId( ))

	} else {
		// -- load upwards or downwards by search score.
		throw new Error('loading search results not implemented.')
	}

}

triggerLoad.top    = ( ) => triggerLoad(false)
triggerLoad.bottom = ( ) => triggerLoad(true)





var detectEdge = ({windowTop, scrollHeight, scrollPosition}) => {

	var args  = {windowTop, scrollHeight, scrollPosition}

	var topic = scrollHeight - scrollPosition === 0
		? ':atBottom'
		: ':atTop'

	ENGRAM.eventBus.fire(':atTop', args)

}




var onLoadBookmark = bookmark => {

	var query = getURL( )

	is.always.object(bookmark)
	is.always.number(bookmark.bookmarkId)

	ENGRAM.cache.set(bookmark.bookmarkId, {
		bookmark,
		metadata: {
			scores: query.length === 0
				? { }
				: {
					[query]: scoreTextMatch(query, isSplitSubstring(query), bookmark.title)
				}
		}
	})

	ENGRAM.eventBus.fire(':rescore')

}




















ENGRAM.eventBus
.on(':scroll', detectEdge)

.on(':atBottom', triggerLoad.bottom)
.on(':atTop',    triggerLoad.top)

.on(':load-bookmark', onLoadBookmark)

.on(':scrollup-bookmarks',   loadListUp)
.on(':scrolldown-bookmarks', loadListDown)

.on(':loaded-bookmarks', ({originalOffset, id}) => {

	ENGRAM.eventBus.await(':redraw', ( ) => {
		$(window).scrollTop($('#' + id).offset( ).top - originalOffset)
	})

})





setImmediateInterval(ENGRAM.updateTimes, 250)
setImmediateInterval(fillBookmarks,      250)





listeners.rebroadcastKeyEvents( )
listeners.deleteBookmark( )
listeners.onScroll( )
listeners.onStop( )






ENGRAM.syncBookmarks( )
