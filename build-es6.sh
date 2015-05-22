#!/usr/bin/env sh





babel node_modules/engram/es6/ --watch --out-dir node_modules/engram/
babel public/javascript/src/   --watch --out-dir public/javascript/lib
babel bin/                     --watch --out-dir bin/
