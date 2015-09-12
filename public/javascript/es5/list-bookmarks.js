(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
"use strict";
{
  var listNextById = (function(downwards, offset, amount) {
    listNextById.precond(downwards, offset, amount);
    var bookmarksInRange = Object.keys(ENGRAM.cache).map((function(key) {
      return parseInt(key, 10);
    })).filter((function(id) {
      return downwards ? id < offset : id > offset;
    })).sort((function(num0, num1) {
      return num1 - num0;
    }));
    var sliced = downwards ? bookmarksInRange.slice(0, amount) : bookmarksInRange.slice(-amount);
    return sliced.map((function(key) {
      return ENGRAM.cache[key];
    }));
  });
  listNextById.precond = (function(downwards, offset, amount) {
    is.always.boolean(downwards);
    is.always.number(offset);
    is.always.number(amount);
  });
  var listDown = listNextById.bind({}, true);
  var listUp = listNextById.bind({}, false);
}

//# sourceURL=/home/ryan/Code/engram.js/public/javascript/es6/list-bookmarks.js
},{}]},{},[1]);
