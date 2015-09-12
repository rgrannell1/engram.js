
"use strict"





/*
	select a certain number of bookmarks starting before or after an ID.
*/





{


	let listNextById = (downwards, offset, amount) => {

		listNextById.precond(downwards, offset, amount)


		// -- select bookmarks in the right ID range.
		// -- sort is slow if object imp. isn't ordered.
		var bookmarksInRange = Object.keys(ENGRAM.cache)
			.map(
				key => parseInt(key, 10))
			.filter(
				id  => downwards
					? id < offset
					: id > offset)
			.sort(
				(num0, num1) => num1 - num0)





		var sliced = downwards
			? bookmarksInRange.slice(0, amount)
			: bookmarksInRange.slice(-amount)

		return sliced.map(key => ENGRAM.cache[key])

	}

	listNextById.precond = (downwards, offset, amount) => {

		is.always.boolean(downwards)
		is.always.number(offset)
		is.always.number(amount)

	}




	var listDown = listNextById.bind({ }, true)
	var listUp   = listNextById.bind({ }, false)

}
