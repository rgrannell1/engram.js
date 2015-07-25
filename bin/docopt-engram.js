#!/usr/bin/env node
"use strict";

var doc = "\n\nUsage:\n    engram [--port=<port>] [--dbpath=<dbpath>] [--keypath=<path>] [--certpath=<path>]\n    engram certs                               [--keypath=<path>] [--certpath=<path>]\n    engram wipe logs\n    engram wipe db\n    engram (-h | --help | --version)\n\nVersion:\n\tv0.1.0\n\nDescription:\n\n\nOptions:\n    --port=<port>        The port to run the server on [default: 5000].\n    --dbpath=<dbpath>    The path to which the database should be saved [default: /data/engram.db].\n    --keypath=<path>     [default: certs/key.pem].\n    --certpath=<path>    [default: certs/cert.pem].\n";

var docopt = require("docopt").docopt;
var engram = require("engram/es5/engram");
var args = docopt(doc);

engram({
  port: parseInt(args["--port"], 10),

  dbpath: args["--dbpath"],
  keypath: args["--keypath"],
  certpath: args["--certpath"],

  wipe: args.wipe,
  certs: args.certs,

  db: args.db,
  logs: args.logs
});