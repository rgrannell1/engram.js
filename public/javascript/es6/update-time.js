
"use strict"





{

	let months = [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun",
		"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
	]

	let oneSecond = 1
	let oneMinute = 60
	let oneHour   = 3600
	let oneDay    = 24 * 3600





	var formatInterval = seconds => {

		var now   = new Date( )
		var ctime = new Date(now - (1000 * seconds))

		if (seconds < oneMinute) {
			return `${seconds}s`
		} else if (seconds < oneHour) {
			return `${Math.round(seconds / oneMinute)}m`
		} else if (seconds < oneDay) {
			return `${Math.round(seconds / oneHour)}h`
		} else {

			var year = ctime.getFullYear( ) === now.getFullYear( )
				? ''
				: ctime.getFullYear( )

			return `${ months[ctime.getMonth( )] } ${ctime.getDate( )} ${year}`
		}

	}

	var extractTime = time => {
		return new Date(parseInt($(time).attr('data-ctime'), 10) * 1000)
	}

	var secondsBetween = (recent, old) => {
		return Math.floor((recent - old) / 1000)
	}

	var renderTime = $time => {

		var elapsed   = secondsBetween(new Date, extractTime($time))
		var formatted = formatInterval(elapsed)

		if ($time.text( ) !== formatted) {
			$time.text(formatted)
		}

	}





	ENGRAM.updateTimes = ( ) => {

		$(ENGRAM.selectors.TIMES).each(function ( ) {
			renderTime($(this))
		})

	}
}
