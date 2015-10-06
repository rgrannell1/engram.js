
"use strict"





var constants       = { }
constants.urls      = { }
constants.selectors = { }
constants.date      = { }
constants.view      = { }
constants.unicode   = { }




constants.date.SHORT_MONTHS = [
	"Jan", "Feb", "Mar", "Apr", "May", "Jun",
	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

constants.date.MINUTE_IN_S  = 60
constants.date.HOUR_IN_S    = 3600
constants.date.DAY_IN_S     = 24 * 3600

constants.date.S_IN_MS      = 1000
constants.date.MINUTE_IN_MS = constants.date.S_IN_MS * 60
constants.date.HOUR_IN_MS   = constants.date.S_IN_MS * 3600
constants.date.DAY_IN_MS    = constants.date.S_IN_MS * 24 * 3600





constants.selectors.BOOKMARKS          = '#bookmarks'
constants.selectors.BOOKMARK_CONTAINER = '#bookmark-container'
constants.selectors.ARTICLES           = '#bookmarks article'
constants.selectors.UPLOAD_FORM        = '#uploader-hidden'
constants.selectors.UPLOAD_BUTTON      = 'uploader'
constants.selectors.DELETE_BUTTONS     = '.delete-bookmark'
constants.selectors.TIMES              = '.bookmark time'





constants.unicode.WRAPPED_PRESENT      = '🎁 '
constants.unicode.CARD_FILE_BOX        = ' 	🗃 '
constants.unicode.HEAVY_MULTIPLICATION = String.fromCharCode(10006)





constants.view.VISIBLE_BOOKMARKS = 50







module.exports = constants
