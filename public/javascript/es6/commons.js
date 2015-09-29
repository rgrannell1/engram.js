
"use strict"





var constants = require('./constants')



var commons         = { }

commons.data        = { }
commons.data.string = { }
commons.date        = { }
commons.messages    = { }
commons.log         = { }
commons.external    = { }
commons.mithril     = { }





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




commons.date.formatElapsed.ms = millis => {

	if (millis < constants.date.MINUTE_IN_MS) {
		// -- seconds range

		return commons.date.addUnit.second(millis / constants.date.S_IN_MS)

	} else if (millis < constants.date.HOUR_IN_MS) {
		// -- minutes range

		return commons.date.addUnit.minute(millis / constants.date.S_IN_MS)

	} else if (millis < constants.date.DAY_IN_MS) {
		// -- hours range

		return commons.date.addUnit.hour(millis / constants.date.S_IN_MS)

	} else {
		// -- month - years range

		var isSameYear = new Date( ).getFullYear === (new Date( ) - millis).getFullYear

		return isSameYear
			? commons.date.addUnit.month(millis / constants.date.S_IN_MS)
			: commons.date.addUnit.year(millis / constants.date.S_IN_MS)

	}

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

commons.data.string.locate = (char, string, from = 0) => {

	for (let ith = from; ith < string.length; ++ith) {
		if (char === string.charAt(ith)) {
			return ith
		}
	}

	return -1
}





commons.log.levelNames    = ['trace', 'info', 'summary', 'warning-low', 'warning-high', 'error', 'fatal']
commons.log.formatMessage = (level, message, data) => {
	return level + ': ' + message + data ? ' ' + JSON.stringify(data) : ''
}

commons.log.levelNames.forEach(level => {
	commons.log[level] = commons.log.formatMessage.bind({ }, level)
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



module.exports = commons
