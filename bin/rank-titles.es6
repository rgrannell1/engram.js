#!/usr/bin/env node

"use strict"





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

	return pairs.map( ({url, title}) => {

		var out = {}

		Object.keys(algorithms).forEach(name => {

			out[name] = {
				title: algorithms[name](url, title),
				url:   url
			}

		})

		return out

	})

}

var surveyResults = (titles, stored, callback) => {


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


