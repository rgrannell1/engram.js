
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
