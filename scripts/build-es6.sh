#!/usr/bin/env sh



cd ..

babel node_modules/engram/test/es6 --watch                  --out-dir node_modules/engram/test/es5/ &
babel node_modules/engram/es6/     --watch                  --out-dir node_modules/engram/es5/      &
babel public/javascript/es6/       --watch --modules common --out-dir public/javascript/es5         &
babel bin/                         --watch                  --out-dir bin/                          &
