
"use script"





var expect = chai.expect





var commons = window.ENGRAM.commons




describe('commons.date.formatDate', function ( ) {

})

describe('commons.date.formatInterval', function ( ) {


})

describe('commons.data.enum', function ( ) {

	it('each case is assigned an index', function ( ) {

		var testData = commons.data.enum(['0', '1', '2'])

		expect(testData).to.be.a('object')

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

describe('commons.data.string.locate', function ( ) {

	it('correctly locates characters', function ( ) {

		expect(commons.data.string.locate('', '')).to.equal(-1)
		expect(commons.data.string.locate('a', '')).to.equal(-1)

		expect(commons.data.string.locate('a', 'aaa')).to.equal(0)
		expect(commons.data.string.locate('a', 'aaa', 1)).to.equal(1)
		expect(commons.data.string.locate('a', 'aaa', 2)).to.equal(2)

	})

})

describe('commons.log.formatMessage', function ( ) {

	it('constructs a valid message', function ( ) {

		expect(commons.log.formatMessage('level', 'message')).to.equal('level: message')
		expect(commons.log.formatMessage('level', 'message', {x: 1})).to.equal('level: message {"x": 1}')


	})

})

describe('commons.data.array.difference', function ( ) {

	it('returns the empty array where appropriate', function ( ) {

		expect( commons.data.array.difference([ ], [ ]) ).to.deep.equal(['b'])

	})

	it('returns elements in set 1 not in set 0', function ( ) {

		expect( commons.data.array.difference(['a'], ['a', 'b']) ).to.deep.equal(['b'])

	})

})
