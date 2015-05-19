#!/usr/bin/env node

"use strict"





var doc = `

Usage:
    engram --port=<port>
    engram (-h | --help | --version)

Version:
v0.1.0

Description:

Options:
    --port=<port>    [default: 5000] the port to run the server on.
`




var docopt = require('docopt').docopt
var engram = require('engram/engram')
var args   = docopt(doc)





engram({
	port: args['--port']
})