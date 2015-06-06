#!/usr/bin/env node





var doc = `
Usage:
    rank
    rank summarise
`





var fs     = require('fs')
var docopt = require("docopt").docopt
var prompt = require('prompt')

var args   = docopt(doc)





var algorithms = { }

algorithms.naive = (uri, title) => title
















if (args.summarise) {

	fs.readFile('data/data-bookmarks-stored.json', 'utf8', (err, data) => {

		var stored = { }

		try {
			stored = JSON.parse(data)
		} catch (err) {

		}

		var scores = [ ]

		Object.keys(stored)
		.map(key => stored[key])
		.forEach(results => {

			results.forEach(ith => {
				scores[ith] ? ++scores[ith] : scores[ith] = 1
			})

		})

		var summary = Object.keys(algorithms)
		.map((algorithm, ith) => {

			var realScore = scores[ith]

			console.log(`${algorithm}: ${realScore} / ${Object.keys(stored).length} were bad.`)

		})

	})


} else {

	fs.readFile('data/data-bookmarks-stored.json', 'utf8', (err, data) => {

		var stored = { }

		try {
			stored = JSON.parse(data)
		} catch (err) {

		}


		fs.readFile('data/data-bookmarks.json', 'utf8', (err, data) => {

			if (err) {
				throw err
			}

			var pairs = JSON.parse(data)

			surveyResults(processTitles(algorithms, pairs), stored, (err, data) => {

				console.log( data )

			})

		})

	})

}








var processTitles = (algorithms, pairs) => {

	var out = { }

	pairs.forEach( ({url, title}) => {

		out[url] = { }

		Object.keys(algorithms).forEach(name => {
			out[url][name] = algorithms[name](url, title)
		})

	})

	return out

}





var clearScreen = ( ) => {
	process.stdout.write('\x1B[2J')
}

var processInput = (url, stored, {badTitles}) => {

	try {

		if (badTitles === 'q') {
			process.exit( )
		}

		var bad = badTitles
			.split(',')
			.filter(number => {
				return number.length > 0
			})
			.map(number => {
				return parseInt(number, 10)
			})

		stored[url] = bad

		if (Object.keys(stored).length === 0) {
			return
		}

		var deparsed = JSON.stringify(stored)

		fs.writeFile('data/data-bookmarks-stored.json', deparsed, err => {
			if (err) {throw err}
		})

	} catch (err) {
		throw err
	}

}

var promptInput = (url, stored, variants, recall) => {

	console.log(`url: ${url}`)
	console.log('')

	Object.keys(variants).forEach((algorithm, ith) => {
		console.log(`${ith}, ${algorithm}:       ${variants[algorithm]}`)
	})

	console.log('')

	prompt.get('badTitles', (err, results) => {

		if (err) {
			throw err
		}

		processInput(url, stored, results)
		recall( )

	})

}




var surveyResults = (titles, stored, callback) => {
	// -- print to the screen.

	var recall = ( ) => {

		var unscreened = Object.keys(titles).filter(url => {
			return Object.keys(stored).indexOf(url) === -1
		})

		if (unscreened.length === 0) {
			process.exit( )
		}

		var toScreen = unscreened[
			Object.keys(unscreened)[ Math.floor(Math.random( ) * Object.keys(unscreened).length) ]
		]

		clearScreen( )
		promptInput(toScreen, stored, titles[toScreen], recall)

	}

	recall( )

}





