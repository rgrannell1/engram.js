#!/usr/bin/env node





var doc = `
Usage:
    rank
    rank summarise
    rank clear
`




var $      = require('jquery')
var fs     = require('fs')
var docopt = require('docopt').docopt
var colors = require('colors')

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

algorithms['trim-delimiter'] = (uri, title) => {

	var delimiter = /[ \t]+[|\-—»][ \t]+[^|\-—»]+$/g

	return title.replace(delimiter, '')

}

algorithms['trim-pipe'] = (uri, title) => {
	return title.split(/[ \t]*[|][^|]+/g).join('')
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

			var results =
				Object.keys(algorithmTitles[url])
				.map(algorithm => {
					return {
						algorithm,
						title: algorithmTitles[url][algorithm]
					}
				})

			var duplicates = true

			// -- obviously a bad algorithm; doesn't matter here.
			for (var ith = 0; ith < results.length; ++ith) {
				for (var jth = 0; jth < results.length; ++jth) {

					var isSame = results[ith].title === results[jth].title
					duplicates = duplicates && isSame

				}
			}


			if (!duplicates) {

				return results.map(result => {
					return colors.green(`${result.algorithm}: ${result.title}`)
				}).join('\n')

			} else {

				return results.map(result => {
					return `${result.algorithm}: ${result.title}`
				}).join('\n')

			}


		})
		.join('\n\n')

	console.log(result)

}
