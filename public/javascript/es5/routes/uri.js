(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var Path = (function(path) {
  if (is.string(path)) {
    return StringPath(path);
  } else if (is.location(path)) {
    return WindowPath(path);
  } else {
    throw TypeError('path method.');
  }
});
var StringPath = (function(path) {
  var self = {
    data: path,
    getPath: (function() {
      return self.data;
    }),
    setPath: (function(path) {
      return self.data = path;
    })
  };
  return self;
});
var WindowPath = (function(path) {
  var self = {
    data: path,
    getPath: (function() {
      return [self.data.pathname, self.data.search, self.data.hash].filter((function(part) {
        return part && part.length > 0;
      })).join('');
    }),
    setPath: (function(path) {
      history.pushState(null, '', path);
    })
  };
  return self;
});

//# sourceURL=/home/ryan/Code/clouter.js/es6/uri.js
},{}]},{},[1]);
