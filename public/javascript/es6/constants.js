
"use strict"





var constants       = { }
constants.urls      = { }
constants.selectors = { }
constants.date      = { }




constants.date.SHORT_MONTHS = [
	"Jan", "Feb", "Mar", "Apr", "May", "Jun",
	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

constants.date.MINUTE_IN_S  = 60
constants.date.HOUR_IN_S    = 3600
constants.date.DAY_IN_S     = 24 * 3600

constants.dakte.S_IN_MS      = constants.date.S_IN_MS * 1000
constants.date.MINUTE_IN_MS = constants.date.S_IN_MS * 60
constants.date.HOUR_IN_MS   = constants.date.S_IN_MS * 3600
constants.date.DAY_IN_MS    = constants.date.S_IN_MS * 24 * 3600





constants.urls.BOOKMARK_TEMPLATE = '/public/html/bookmark-template.html'
constants.urls.IMPORT            = '/api/import'





constants.selectors.BOOKMARKS          = '#bookmarks'
constants.selectors.BOOKMARK_CONTAINER = '#bookmark-container'
constants.selectors.ARTICLES           = '#bookmarks article'
constants.selectors.UPLOAD_FORM        = '#uploader-hidden'
constants.selectors.UPLOAD_BUTTON      = '#uploader'
constants.selectors.DELETE_BUTTONS     = '.delete-bookmark'
constants.selectors.TIMES              = '.bookmark time'





module.exports = constants
