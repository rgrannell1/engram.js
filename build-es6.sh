#!/usr/bin/env sh





babel node_modules/engram/test/es6 --watch                  --out-dir node_modules/engram/test &
babel node_modules/engram/es6/     --watch                  --out-dir node_modules/engram/     &
babel public/javascript/src/       --watch --modules common --out-dir public/javascript/lib    &
babel bin/                         --watch                  --out-dir bin/                     &
