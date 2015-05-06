#!/usr/bin/env node
"use strict";

var doc = "\n\nUsage:\n    engram --port=<port>\n    engram (-h | --help | --version)\n\nVersion:\nv0.1.0\n\nDescription:\n\nOptions:\n    --port=<port>    [default: 5000] the port to run the server on.\n";

var docopt = require("docopt").docopt;
var engram = require("engram/engram");
var args = docopt(doc);

engram({
    port: args["--port"]
});
