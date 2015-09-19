(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

require('./test-environment')
require('./test-commons')






console.log('-- loading tests.')

},{"./test-commons":2,"./test-environment":3}],2:[function(require,module,exports){

"use script"



var commons = window.ENGRAM.commons





describe('commons.date.formatDate', function ( ) {

})

describe('commons.date.formatInterval', function ( ) {

})

describe('commons.data.enum', function ( ) {

	it('each case is assigned an index', function ( ) {

		var testData = commons.data.enum(['0', '1', '2'])

		expect(testData).to.be.a('array')

		Object.keys(testData).forEach(function (label, ith) {

			var reparsed = parseInt(label, 10)
			expect(reparsed).to.equal(ith)

		})

	})

})

describe('commons.date.interval.s', function ( ) {

})

describe('commons.date.interval.ms', function ( ) {

})

describe('commons.date.string.locate', function ( ) {

})

},{}],3:[function(require,module,exports){

if (!window.ENGRAM) {
	throw Error('missing engram dependency.')
}
},{}]},{},[1]);
