
var use   =  { }




use.location = {

	isMatch: true,
	where:   {
		path: predicate => {

			use.location.parts.push({
				method: 'getNextPath',
				predicate
			})

			return use.location

		},
		paths: predicate => {

			use.location.parts.push({
				method: 'getNextPaths',
				predicate
			})

			return use.location

		},
		hash: predicate => {

			use.location.parts.push({
				method: 'getNextHash',
				predicate
			})

			return use.location

		},
		params: predicate => {

			use.location.parts.push({
				method: 'getNextParams',
				predicate
			})

			return use.location

		},
		param: predicate => {

			use.location.parts.push({
				method: 'getNextParam',
				predicate
			})

			return use.location

		}
	},
	parts: [ ],
	compile: function ( ) {
		return location => {

			var iterator = new QueryIterator.fromLocation(location)

			for (var ith = 0; ith < this.parts.length; ++ith) {

				var part = this.parts[ith]

				var {method, predicate} = part

				var clone = QueryIterator.fromQueryIterator(iterator)
				var value = iterator[method]( )




				if (is.undefined(value)) {
					return false
				} else {

					var isMatch = predicate.call(clone, value, clone)

					if (!isMatch) {
						return false
					}

				}
			}

			return true

		}
	}

}
