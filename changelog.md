
# 0.7.0
------------------------------------------------------------------------------------------------------------
2015 June  17

* Lowered the default number of concurrent requests to five, as my laptop was oversaturated with requests.

* Implemented a very crude form of title-trimming, which will be expanded in future.

* Refactored some event messaging to use factored-out messages.

* RequestURL now protects against undefined requests.

* Added request rate calculation.

* Added subsystem logging.

* Cache hits are now logged at the DEBUG level.

* Closed #20: "Add title testing regex page".

* Closed #19: "Switch to encoding: null for all request bodies".

* Closed 17#: "Host-name extraction not done for target url".

* Closed #11: "Switch to camelCase identifiers in API".







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
