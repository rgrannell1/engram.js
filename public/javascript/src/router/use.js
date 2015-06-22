
{

	let parsePath = path => {

		var data = { }



		return data

	}






	let SELECTORS = [
		'path', 'paths', 'dirname', 'basename', 'rawPaths',
		'rest',
		'hash',
		'rawQuery', 'rawQueryParams', 'rawQueryParam', 'queryParams', 'queryParam'
	]

	let buildSelector = selector => {
		return predicate => {
			return predicate.call(this, this.getNext(selector))
		}
	}





	let where = { }

	SELECTORS.forEach(selector => {
		where.selector = buildSelector(selector)
	})





	var use = { }

	use.self = context => {

	}

	use.location = location => {

	}

}