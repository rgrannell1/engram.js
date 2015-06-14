#!/usr/bin/env node





var doc = `
Usage:
    rank
    rank summarise
    rank clear
`




var $      = require('jquery')
var fs     = require('fs')
var docopt = require("docopt").docopt
var prompt = require('prompt')

var args   = docopt(doc)

var URL = require('url')



var algorithms = { }

algorithms['trim-end'] = (uri, title) => {

	var url = URL.parse(uri)

	// -- remove the .com
	var hostname = url.hostname.split('.').slice(0, -1).join('.')

	var regex = new RegExp(`(.+):?([ \t].[ \t]${ hostname }):?`, 'i')
	return title.replace(regex, '$1')

}







fs.readFile('data/data-bookmarks.json', 'utf8', (err, data) => {

	if (err) {
		throw err
	}

	var pairs = JSON.parse(data)

	surveyResults(processTitles(algorithms, pairs), (err, data) => {})

})







var processTitles = (algorithms, pairs) => {

	var out = { }

	pairs.forEach( ({url, title}) => {

		out[url] = { }

		Object.keys(algorithms).forEach(name => {
			out[url][name] = algorithms[name](url, title)
		})

		out[url].IDENTITY = title

	})

	return out

}





var surveyResults = algorithmTitles => {
	// -- print to the screen.

	var result =
		Object.keys(algorithmTitles)
		.map(url => {
			return Object.keys(algorithmTitles[url]).map(algorithm => {
				return `${algorithm}: ${algorithmTitles[url][algorithm]}`
			})
		})
		.join('\n')

	console.log(result)

}





