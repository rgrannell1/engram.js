
"use strict"





var constants = require('./constants')



var commons = {
	dom:  { },
	data: {
		string: { },
		array:  { },
		object: { }
	},
	assert:   { },

	date:     { },
	messages: { },
	log:      { },
	external: { },
	mithril:  { }
}





/*
	format a date object as a human-readable exact
	date-time format.
*/

commons.date.formatDate = date => {

	var dateString = [
		date.getFullYear( ),
		date.getMonth( ) + 1,
		date.getDate( )
	].join('-')

	var timeString = [
		date.getHours( ),
		date.getMinutes( )
	].join(':')


	return `${dateString} ${timeString}`

}




commons.date.formatElapsed  = { }
commons.date.formatInterval = { }
commons.date.interval       = { }

commons.date.addUnit        = {
	second: time => `${time}s`,
	minute: time => `${time}m`,
	hour:   time => `${time}h`,
	month:  time => {

		var date = new Date(time)

		var day   = constants.date.SHORT_MONTHS[date.getMonth( )]
		var month = date.getDate( )

		return `${day} ${month}`

	},
	year:   time => {

		var date = new Date(time)

		var day   = constants.date.SHORT_MONTHS[date.getMonth( )]
		var month = date.getDate( )
		var year  = date.getFullYear( )

		return `${day} ${month} ${year}`

	}
}





{

	let timeInterval = (factor, newer, older) => {
		return Math.floor((newer - older) / factor)
	}

	commons.date.interval.s  = timeInterval.bind({ }, 1000)
	commons.date.interval.ms = timeInterval.bind({ }, 1)

}





commons.date.isCurrentYear = date => {
	return new Date( ).getFullYear === date.getFullYear
}



commons.date.formatElapsed.ms = millis => {

	var unit
	var previousDate = new Date( ) - millis

	if (millis < constants.date.MINUTE_IN_MS) {
		unit = 'second'
	} else if (millis < constants.date.HOUR_IN_MS) {
		unit = 'minute'
	} else if (millis < constants.date.DAY_IN_MS) {
		unit = 'hour'
	} else if (commons.date.isCurrentYear(previousDate)) {
		unit = 'month'
	} else {
		unit = 'year'
	}

	return commons.date.addUnit[unit](millis / constants.date.S_IN_MS)

}

commons.date.formatElapsed.s  = seconds => {
	return commons.date.formatElapsed.ms(constants.date.S_IN_MS * seconds)
}






{

	let formatInterval = (factor, newer, older) => {
		return commons.date.formatElapsed.ms(commons.date.interval.ms(newer, older))
	}

	commons.date.formatInterval.s  = formatInterval.bind({ }, 1000)
	commons.date.formatInterval.ms = formatInterval.bind({ }, 1)

}





commons.data.enum = labels => {

	var lookup = { }

	labels.forEach((label, ith) => {
		lookup[label] = ith.toString()
	})

	return lookup

}





commons.data.array.maxBy = (fn, array) => {

	commons.data.array.maxBy.precond(fn, array)

	return array.reduce((max, elem) => {

		var magnitude = fn(elem)

		return magnitude > max.magnitude ? {elem, magnitude} : max

	}, {value: undefined, magnitude: -Infinity})
}

commons.data.array.maxBy.precond = (fn, array) => {

	is.always.function(fn)
	is.always.array(array)

}





commons.data.string.pluck = string => object => {

	commons.data.string.pluck.precond(string, object)

	return object[string]
}

commons.data.string.pluck.precond = (string, object) => {

	is.always.string(string)
	is.always.object(object)

}





commons.data.array.difference = (set0, set1) => {

	var exclusion = [ ]

	set0.forEach(item0 => {
		if (set1.indexOf(item0) === -1) {
			exclusion.push(item0)
		}
	})

	return exclusion

}



commons.data.object.containsProperties = (props, object) => {

	var hasAllProps = true

	Object.keys(object).forEach(prop => {
		hasAllProps = hasAllProps && props.indexOf(prop) !== -1
	})

	return hasAllProps

}





commons.log.levelNames    = ['stub', 'trace', 'info', 'summary', 'warningLow', 'warningHigh', 'error', 'fatal']
commons.log.formatMessage = (level, message, data) => {
	return level + ': ' + message + (data ? ' ' + JSON.stringify(data) : '')
}

commons.log.levelNames.forEach(level => {
	commons.log[level] = (message, data) => {
		console.log(commons.log.formatMessage(level, message, data))
	}
})





/*
	associate each field in an object with
	m.prop setter/getter pair.
*/

commons.mithril.propObj = obj => {

	var model = { }

	Object.keys(obj).forEach(key => {
		model[key] = m.prop(obj[key])
	})

	return model

}





/*
	invoke each mithril view.
*/

commons.mithril.invokeView = comp => {
	return comp.view(comp.ctrl)
}





commons.assert.hasProperties = (props, object) => {


	var excluded = commons.data.array.difference(props, Object.keys(object))

	if (excluded.length > 0) {

		var message = 'object did not contain expected properties'
		message += '\n' + JSON.stringify(excluded)

		throw new Error(message)

	}

}





module.exports = commons
