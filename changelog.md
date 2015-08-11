
# 0.9.0
------------------------------------------------------------------------------------------------------------

2015 August 11

## ENHANCEMENTS

* Closed #36: added basic authentication.

* Added certificate generation in node.

* Added whitelisted IP checking.

* Moved many magic numbers into constants.

* Improved link colouring.

* Sped up pubSub code.

* Closed #41: Refactored top level of Engram server into smaller components.

* Removed unneeded import statements from code.

* Tidied request, response, and error logging.

* Added project makefile to replace bash scripts.

* Tidied statistic logging.

* Closed #36: added security logging.

* Err( ) now emits an event when constructed.

* Added IDs to all requests.

* /api/bookmarks/all now redirects to /api/bookmarks/

## BUG-FIXES

* Closed #39: Moved GET /bookmark/:id and GET /archive/:id under /api.

* Cert-related errors are now handled correctly.

* Closed #31: Backspace now wipes ?q= in app.







# 0.8.0
------------------------------------------------------------------------------------------------------------





## ENHANCEMENTS

* Closed #28: added HTTPS support.

* Fixed client key-capture in chrome.

* The URL hash now dynamically updates as you scroll.

* Improved title-trimming algorithm.

* Closed #22: Added a (currently under-designed) client-side router for improving URLs.

* Seperated out loggers.

* Improved pubSub handling of numeric topics.

* Added support for request-time logging.

* Added support for ignoring some saved bookmark types (css.map and such).

* Added some rudementary statistics logging.

* All pubSub now uses enums instead of strings to represent topics.

* Refactored many selectors into enums.

* Closed #30: Refactored client-side code into many more folders

* Err( ) now logs to its own file.

* Added command-line options to erase the database or logs.

* Refactored project folder layout.

* Added sublime-project file.

* Closed #27: routing language is now part of another module, so this issue belongs to it.

* Closed #26: seperated routing into own module.

* Closed #21: routing is improved over the previous release.

## BUG-FIXES

* Improved request handling on empty responses.

* Closed #29, #25: re-fixed client scrolling after updates. This bug was not in any release.

* Closed #23: correct character codes are now used in chrome.





# 0.7.0
------------------------------------------------------------------------------------------------------------
2015 June  17

## ENHANCEMENTS

* Implemented a very crude form of title-trimming, which will be expanded in future.

* Refactored some event messaging to use factored-out messages.

* Added request rate calculation.

* Added subsystem logging.

* Cache hits are now logged at the DEBUG level.

* Closed #20: "Add title testing regex page".

* Closed #19: "Switch to encoding: null for all request bodies".

* Closed 17#: "Host-name extraction not done for target url".

* Closed #11: "Switch to camelCase identifiers in API".

## BUG-FIXES

* Lowered the default number of concurrent requests to five, as my laptop was oversaturated with requests.

* RequestURL now protects against undefined requests.









# 0.6.0
------------------------------------------------------------------------------------------------------------
2015 June  4

## ENHANCEMENTS:

* Closed #16: "parametreise database location".

* Closed #10: "Add non-html archiving". Archiving superficially works for pngs, though this is largely untested.

* Closed #9: "Delete associated archive when URL is deleted".

* Removed custom database methods, as they were worse wrappers for existing code.

* Archives now saved as 'blob'

* Added HTTP status codes as a dictionary.

* Moved archive fetching to top-level route, for consistency with bookmarks.






# 0.5.0
------------------------------------------------------------------------------------------------------------
2015 May 27

## ENHANCEMENTS:

* Closed #6: "Add import button to bookmark page".

* Closed #8: "Unify URL saving and importing". Pubsub is used to share URL saving code
between the import and save routes.

* Added travis.

*  Added sass for styles.

* `requestURL` can now limit the number of concurrent requests made.

* `requestURL` now prevents refreshed links from being cleared from the cache prematurely.


* Factored some magic numbers into constants file.

* Bookmark import now validated on server-side.


## BUG-FIXES:

* Supertest now runs as expected; failure caused by lack of default callback for .end( ) in tests.

* Removed phantom from the title extraction algorithm, as it failed for SSL, caused a memory leak, and was generally a pain to use.





# 0.4.0
------------------------------------------------------------------------------------------------------------
2015 May 26

## ENHANCEMENTS:

* Closed #3: "Run JSHint".

* Closed #4: "Add cache-size maintainance".

* Closed #5: "Add delay for cache requests".






# 0.3.0
------------------------------------------------------------------------------------------------------------
2015 May 26

## ENHANCEMENTS:

* Closed #2: "Refactor to setInterval and pubSub".

* Saving a bookmark now instantly triggers title extraction and similar tasks.





# 0.2.0
------------------------------------------------------------------------------------------------------------
2015 May 25

## ENHANCEMENTS:

* Closed #1: "Support URLs with and without protocol".

* Added test for #1.

* ES6 rebuilding script now runs each moniter in parallel.

* Engram now returns the express server object.

* Added RFC bookmark URL validation.





# 0.1.0

The initial release.
