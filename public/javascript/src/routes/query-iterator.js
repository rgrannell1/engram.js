





var parseResource = raw => {

	var parts = { }

	if (raw.indexOf('#') !== -1) {

		parts.hash = raw.slice(raw.indexOf('#') + 1)
		raw        = raw.slice(0, raw.indexOf('#'))

		if (raw.indexOf('?') !== -1) {

			var queryString = raw.slice(raw.indexOf('?') + 1)
			raw             = raw.slice(0, raw.indexOf('?'))

			parts.params = queryString
				.split('&')
				.map(pairs => pairs.split('='))

		}

	}

	parts.paths = raw.split('/').filter(part => part.length > 0)

	return parts
}









class QueryIterator {

	constructor(raw) {
		this.data = parseResource(raw)
	}

	static fromQueryIterator(iterator) {

		var raw = [
			iterator.getNextPaths( ),
			iterator.getNextParams( ),
			iterator.getNextHash( )
		]
		.filter(part => part && part.length > 0)
		.join('')

		return new QueryIterator(raw)

	}

	static fromLocation(location) {

		var raw = [
			location.pathname,
			location.search,
			location.hash
		]
		.filter(part => part.length > 0)
		.join('')

		return new QueryIterator(raw)

	}





	peekNextPath( ) {

		var isEmpty = is.undefined(this.data.paths) || this.data.paths.length === 0

		if (!isEmpty) {
			return this.data.paths[0]
		}

	}

	getNextPath( ) {

		var result = this.peekNextPath( )

		if (!is.undefined(result)) {
			this.data.paths.shift( )
		}

		return result

	}





	peekNextPaths( ) {

		var isEmpty = is.undefined(this.data.paths) || this.data.paths.length === 0

		if (!isEmpty) {
			return '/' + this.data.paths.join('/')
		}

	}

	getNextPaths( ) {

		var result      = this.peekNextPaths( )
		this.data.paths = undefined

		return result

	}




	peekNextHash( ) {

		if (!is.undefined(this.data.hash)) {
			return '#' + this.data.hash
		}

	}

	getNextHash( ) {

		var result     = this.peekNextHash( )
		this.data.hash = undefined

		return result

	}




	peekNextParams( ) {

		var isEmpty = is.undefined(this.data.params) || this.data.params.length === 0

		if (!isEmpty) {

			return '?' + this.data.params.map(pair => {
					return pair.join('=')
				})
				.join('&')

		}

	}

	getNextParams( ) {

		var params       = this.peekNextParams( )
		this.data.params = undefined

		return params

	}





	peekNextParam( ) {

		var isEmpty = is.undefined(this.data.params) || this.data.params.length === 0

		if (!isEmpty) {
			return this.data.params[0]
		}

	}

	getNextParam( ) {

		var result = this.peekNextParam( )

		var isEmpty = is.undefined(this.data.params) || this.data.params.length === 0

		if (!isEmpty) {
			this.data.params.shift( )
		}

		return result

	}

	peekRest( ) {

		var out    = ''

		return [
			this.peekNextPaths( ),
			this.peekNextParams( ),
			this.peekNextHash( )
		]
		.filter(part => part.length > 0)
		.join('')

	}

	getRest( ) {

		var result = this.peekRest( )

		this.data.hash   = undefined
		this.data.paths  = undefined
		this.data.params = undefined

		return result

	}

}
