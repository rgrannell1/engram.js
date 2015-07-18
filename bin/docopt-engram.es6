#!/usr/bin/env node

"use strict"







var doc = `

Usage:
    engram --port=<port> --dbpath=<dbpath>
    engram wipe logs
    engram wipe db
    engram (-h | --help | --version)

Version:
v0.1.0

Description:

Options:
    --port=<port>    [default: 5000] the port to run the server on.
`




var docopt = require('docopt').docopt
var engram = require('engram/es5/engram')
var args   = docopt(doc)





engram({
	port:   parseInt(args['--port'], 10),
	dbpath: args['--dbpath'],
	wipe:   args.wipe,
	db:     args.db,
	logs:   args.logs
})
