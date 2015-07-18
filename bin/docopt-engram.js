#!/usr/bin/env node
"use strict";

var doc = "\n\nUsage:\n    engram --port=<port> --dbpath=<dbpath>\n    engram wipe logs\n    engram wipe db\n    engram (-h | --help | --version)\n\nVersion:\nv0.1.0\n\nDescription:\n\nOptions:\n    --port=<port>    [default: 5000] the port to run the server on.\n";

var docopt = require("docopt").docopt;
var engram = require("engram/es5/engram");
var args = docopt(doc);

engram({
    port: parseInt(args["--port"], 10),
    dbpath: args["--dbpath"],
    wipe: args.wipe,
    db: args.db,
    logs: args.logs
});