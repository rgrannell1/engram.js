"use strict"




if (typeof process !== 'undefined' && process.version) {
	var is = require('is')
}






var on = function (topic, listener) {

	on.precond(topic, listener)
	topic = topic + ''

	if (is.undefined(this.topics[topic])) {
		this.topics[topic] = [ ]
	}

	this.topics[topic].push(listener)

	return this

}

on.precond = (topic, listener) => {

	is.never.undefined(topic)
	is.always.function(listener, 'listener must be a function.')

}



// -- todo re-add 'is' when it gets faster.
// -- declaration this way is faster when compiled.
function fire (topic, data) {

	topic += ''
	fire.precond(topic, data)

	if (topic && this.topics[topic] && this.topics[topic].length > 0) {

		if (typeof data === 'undefined') {
			data = { }
		}

		var topicListeners = this.topics[topic]

		for (let ith = 0; ith < topicListeners.length; ++ith) {
			topicListeners[ith](data)
		}

	}

	return this

}

fire.precond = (topic, data) => {

	if (typeof topic === 'undefined') {
		throw TypeError('.fire: topic cannot be undefined.')
	}

}




var await = function (topic, listener) {

	await.precond(topic, listener)
	topic = topic + ''

	if (is.undefined(this.topics[topic])) {
		this.topics[topic] = [ ]
	}



	var decorated = (...args) => {

		if (decorated.active) {

			decorated.active = false
			listener(...args)
		}

	}

	// -- could also use decorated.call(decorated, )
	decorated.active = true



	this.topics[topic].push(decorated)

	return this


}

await.precond = (topic, listener) => {

	is.never.undefined(topic)
	is.always.function(listener)

}





var EventBus = function ( ) {

	if (!this instanceof EventBus) {
		return new EventBus( )
	}

	return {
		topics: { },
		await,
		fire,
		on
	}

}





if (typeof process !== 'undefined' && process.version) {
	module.exports = EventBus
}
