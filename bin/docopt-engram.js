#!/usr/bin/env node

"use strict"







var doc = `

Usage:
    engram [--port=<port>] [--dbpath=<dbpath>] [--keypath=<path>] [--certpath=<path>]
    engram certs                               [--keypath=<path>] [--certpath=<path>]
    engram (analyse|analyze)
    engram wipe logs
    engram wipe db
    engram (-h | --help | --version)

Version:
	v0.1.0

Description:


Options:
    --port=<port>        The port to run the server on [default: 5000].
    --dbpath=<dbpath>    The path to which the database should be saved  [default: data/engram.db].
    --keypath=<path>     [default: certs/key.pem].
    --certpath=<path>    [default: certs/cert.pem].
`




var docopt = require('docopt').docopt
var engram = require('engram/es6/engram')
var args   = docopt(doc)





engram({
	port:     parseInt(args['--port'], 10),

	dbpath:   args['--dbpath'],
	keypath:  args['--keypath'],
	certpath: args['--certpath'],


	wipe:     args.wipe,
	certs:    args.certs,

	db:       args.db,
	logs:     args.logs
})
