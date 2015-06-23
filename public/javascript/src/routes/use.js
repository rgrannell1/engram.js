
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

			var iterator                = new QueryIterator.fromLocation(location)

			for (let part of this.parts) {

				var {method, predicate} = part

				var value               = iterator[method]( )
				var clone               = QueryIterator.copy(iterator)

				var isMatch             = predicate.call(clone, value)

				if (!isMatch) {
					return false
				}

			}

			return true

		}
	}

}
