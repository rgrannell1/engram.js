"use strict"





ENGRAM.cache = { }





Object.defineProperty(ENGRAM.cache, 'remove', {
	configerable: true,
	value: function (key) {

		if (ENGRAM.cache.hasOwnProperty(key)) {

			ENGRAM.eventBus.fire(EventBus.message.UPDATE_CACHE)
			delete this[key]

		}

		return this

	}
})

Object.defineProperty(ENGRAM.cache, 'set', {
	configerable: true,
	value: function (key, value) {

		if (ENGRAM.cache.hasOwnProperty(key)) {
			throw Error(`attempted to override ${key}`)
		}

		ENGRAM.eventBus.fire(EventBus.message.UPDATE_CACHE)
		this[key] = value

		return this
	}
})
