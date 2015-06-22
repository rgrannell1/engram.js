
var use   =  { }





var where = {
	path: (predicate) => {

		var isMatch  = predicate(this.query.getNextPath( ))
		this.isMatch = this.isMatch && isMatch

		return this

	}
}

use.location = location => {


	return {
		isMatch: true,
		query:   new QueryIterator.fromLocation(location),
		where
	}

}
