#!/usr/bin/env node





var doc = `
Usage:
    rank

`





var fs     = require('fs')
var docopt = require("docopt").docopt
var prompt = require('prompt')

var args   = docopt(doc)





var algorithms = { }

algorithms.naive = (uri, title) => title





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
	process.stdout.write(0o33)
}


var printPrompt = (url, variants) => {

	console.log( clearScreen )

}




var surveyResults = (titles, stored, callback) => {

	var unscreened = Object.keys(titles).filter(url => {
		return Object.keys(stored).indexOf(url) === -1
	})

	var toScreen = unscreened[
		Object.keys(unscreened)[ Math.floor(Math.random( ) * Object.keys(unscreened).length) ]
	]

	// -- print to the screen.
	clearScreen( )
	printPrompt(url, title[toScreen])

}





fs.readFile('data/data-bookmarks-stored.json', 'utf8', (err, data) => {

	var stored = err ? { } : JSON.parse(data)

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


