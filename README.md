Timr
====

Lightweight performance logger using navigation timing

Not intended as a comprehensive performance logger.

This will produce an http get request to an innocuous file on your server, and append all the parameters from the performance.timing event to it.

Usage:

timr.init({…})

Parameters

"beaconURL" : url to the get request e.g. perf.gif

"params" : any custom parameters to append to the query string
