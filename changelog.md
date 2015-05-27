
# 0.6.0
------------------------------------------------------------------------------------------------------------
2015 May

## ENHANCEMENTS:

* Closed #16: "parametreise database location".





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
