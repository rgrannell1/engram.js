
var use   =  { }




use.location = {

	isMatch: true,
	where:   {
		path: condition => {

			use.location.parts.push({
				method: 'getNextPath',
				condition
			})

			return use.location
		},
		paths: condition => {

			use.location.parts.push({
				method: 'getNextPaths',
				condition
			})

			return use.location

		},
		hash: condition => {

			use.location.parts.push({
				method: 'getNextHash',
				condition
			})

			return use.location

		},
		params: condition => {

			use.location.parts.push({
				method: 'getNextParams',
				condition
			})

			return use.location

		},
		param: condition => {

			use.location.parts.push({
				method: 'getNextParam',
				condition
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

				var {method, condition} = part

				var clone = QueryIterator.fromQueryIterator(iterator)
				var value = iterator[method]( )




				if (is.undefined(value)) {
					return false
				} else {

					var isMatch = testMatch(condition, clone, value)

					if (!isMatch) {
						return false
					}

				}
			}

			return true

		}
	}

}





var testMatch = (condition, clone, value) => {

	if (is.function(condition)) {

		return condition.call(clone, value, clone)

	} else if (is.string(condition)) {

		var wrapped = part => {
			return condition === part
		}

		return wrapped(value)

	} else if (is.regexp(condition)) {

		var wrapped = part => {
			return condition.test(part)
		}

		return wrapped(value)

	} else {

		throw TypeError('unimplemented')

	}

}
