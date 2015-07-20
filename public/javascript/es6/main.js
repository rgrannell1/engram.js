
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
			? $(ENGRAM.selectors.ARTICLES).slice(-1)[0]
			: $(ENGRAM.selectors.ARTICLES).slice(0, 1)[0]

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

	var from   = $(ENGRAM.selectors.ARTICLES).length === 0
		? ENGRAM.BIGINT
		: parseInt($(`${ENGRAM.selectors.ARTICLES}:last`).attr('id'), 10)

	var loaded = listDown(from, ENGRAM.MAXLOADED - currentAmount)

	if (loaded.length > 0) {

		ENGRAM.inFocus.setFocus({
			value:        ENGRAM.inFocus.value.concat(loaded),
			currentQuery: ''
		})

	}

}





var getNextId = downwards => {

	var nextId = downwards
		? $(ENGRAM.selectors.ARTICLES).first( ).attr('id')
		: $(ENGRAM.selectors.ARTICLES).last( ).attr('id')


	return downwards
		? parseInt(nextId, 10) - 1
		: parseInt(nextId, 10) + 1

}




var triggerLoadBookmarks = (downwards) => {

	if (getURL( ) === '') {
		// -- load linearly by id up or down.

		var topic  = 'SCROLL' + (downwards ? 'DOWN' : 'UP')  + '_BOOKMARKS'

		ENGRAM.eventBus.fire(EventBus.message[topic], getNextId(downwards))

	} else {
		// -- load upwards or downwards by search score.
		throw new Error('loading search results not implemented.')
	}

}

triggerLoadBookmarks.top    = triggerLoadBookmarks.bind({ }, false)
triggerLoadBookmarks.bottom = triggerLoadBookmarks.bind({ }, true)





var detectEdge = ({windowTop, scrollHeight, scrollPosition}) => {

	var args  = {windowTop, scrollHeight, scrollPosition}

	var topic = scrollHeight - scrollPosition === 0
		? EventBus.message.AT_BOTTOM
		: EventBus.message.AT_TOP

	ENGRAM.eventBus.fire(EventBus.message.AT_TOP, args)

}





var createBookmarkEntry = bookmark => {

	var query = getURL( )

	ENGRAM.eventBus.fire(EventBus.message.RESCORE)

	return {
		bookmark,
		metadata: {
			scores: query.length === 0
				? { }
				: {
					[query]: scoreTextMatch(query, isSplitSubstring(query), bookmark.title)
				}
		}
	}

}



var onLoadBookmark = bookmark => {

	onLoadBookmark.precond(bookmark)
	ENGRAM.cache.set(bookmark.bookmarkId, createBookmarkEntry(bookmark))

}

onLoadBookmark.precond = bookmark => {

	is.always.object(bookmark)
	is.always.number(bookmark.bookmarkId)

}



















ENGRAM.eventBus

.on(EventBus.message.SCROLL, detectEdge)

.on(EventBus.message.AT_BOTTOM, triggerLoadBookmarks.bottom)
.on(EventBus.message.AT_TOP,    triggerLoadBookmarks.top)

.on(EventBus.message.LOAD_BOOKMARK, onLoadBookmark)

.on(EventBus.message.SCROLLUP_BOOKMARKS,   loadListUp)
.on(EventBus.message.SCROLLDOWN_BOOKMARKS, loadListDown)

.on(EventBus.message.LOADED_BOOKMARKS, ({originalOffset, id}) => {

	ENGRAM.eventBus.await(EventBus.message.REDRAW, ( ) => {
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
