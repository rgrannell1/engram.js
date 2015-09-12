(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
"use strict";
Object.defineProperties(exports, {
  commons: {get: function() {
      return commons;
    }},
  __esModule: {value: true}
});
var commons = {};
commons.date = {};
commons.date.formatDate = (function(date) {
  var dateString = (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
  var timeString = (date.getHours() + ":" + date.getMinutes());
  return (dateString + " " + timeString);
});
var commons;

//# sourceURL=/home/ryan/Code/engram.js/public/javascript/es6/commons.js
},{}]},{},[1]);
