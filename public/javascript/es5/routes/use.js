(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

module.exports = require('./lib/is.js')

},{"./lib/is.js":2}],2:[function(require,module,exports){

var a = function (str, val) {

	if (Object.prototype.toString.call(str) !== '[object String]') {
		throw TypeError('a: the argument matching "str" must be a string.')
	}

	return Object.prototype.toString.call(val).toLowerCase() ===
		"[object " + str.toLowerCase() + "]"
}





var what = function (val) {
	return Object.prototype.toString.call(val).toLowerCase().slice(8, -1)
}





var classes = ['array', 'boolean', 'date', 'error', 'function', 'location',
	'null', 'number', 'object', 'regexp', 'string', 'symbol', 'undefined']





var is = ( function () {

	return classes.reduce(function (self, key) {

		self[key] = a.bind(null, key)
		return self

	}, a)

} )()



var always = ( function () {

	var always = function (str, val, message) {

		if (!is[str](val)) {

			var messageClass = Object.prototype.toString.call(message)

			if (messageClass === '[object Function]') {
				// -- supply information to a function callback.

				throw TypeError( message(val, str, what(val)) )

			} else if (messageClass === '[object String]') {

				throw TypeError(message)

			} else {

				var message = 'always.' + str + ': value was not a ' + str + ' (actual type was ' + what(val) + ')'

				if (arguments.callee && arguments.callee.name) {
					message = arguments.callee.name += message
				}

				throw TypeError(message)

			}

		}
	}

	return classes.reduce(function (self, key) {

		self[key] = always.bind(null, key)
		return self

	}, always)

} )()





var never = ( function () {

	var never = function (str, val, message) {

		if (is[str](val)) {

			var messageClass = Object.prototype.toString.call(message)

			if (messageClass === '[object Function]') {
				// -- supply information to a function callback.

				throw TypeError( message(val, str, what(val)) )

			} else if (messageClass === '[object String]') {

				throw TypeError(message)

			} else {

				var message = 'never.' + str + ': value was a ' + str

				if (arguments.callee && arguments.callee.name) {
					message = arguments.callee.name += message
				}

				throw TypeError(message)

			}

		}
	}

	return classes.reduce(function (self, key) {

		self[key] = never.bind(null, key)
		return self

	}, never)

} )()





is.a      = a
is.what   = what
is.always = always
is.never  = never





if (typeof module !== "undefined") {
	module.exports = is
}

},{}],3:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
(function (process){
"use strict";
if (typeof process !== 'undefined' && module.exports) {
  var is = require('is');
}
var use = {};
use.location = {
  isMatch: true,
  where: {
    path: (function(condition, binding) {
      use.location.parts.push({
        method: 'getNextPath',
        condition: condition,
        binding: binding
      });
      return use.location;
    }),
    paths: (function(condition, binding) {
      use.location.parts.push({
        method: 'getNextPaths',
        condition: condition,
        binding: binding
      });
      return use.location;
    }),
    hash: (function(condition, binding) {
      use.location.parts.push({
        method: 'getHash',
        condition: condition,
        binding: binding
      });
      return use.location;
    }),
    params: (function(condition, binding) {
      use.location.parts.push({
        method: 'getNextParams',
        condition: condition,
        binding: binding
      });
      return use.location;
    }),
    param: (function(condition, binding) {
      use.location.parts.push({
        method: 'getNextParam',
        condition: condition,
        binding: binding
      });
      return use.location;
    }),
    rest: (function(condition, binding) {
      use.location.parts.push({
        method: 'getWhole',
        condition: condition,
        binding: binding
      });
      return use.location;
    })
  },
  parts: [],
  compile: function(debug) {
    var $__0 = this;
    return (function(location) {
      var iterator = new UriIterator.fromLocation(location);
      for (var ith = 0; ith < $__0.parts.length; ++ith) {
        var part = $__0.parts[ith];
        var $__1 = part,
            method = $__1.method,
            condition = $__1.condition;
        var clone = UriIterator.fromUriIterator(iterator);
        var value = iterator[method]();
        if (is.undefined(value)) {
          return {
            value: false,
            parts: $__0.parts
          };
        } else {
          var isMatch = isPartMatch(condition, clone, value);
          if (!isMatch) {
            return {
              value: false,
              parts: $__0.parts
            };
          }
        }
      }
      return {
        value: true,
        parts: $__0.parts
      };
    });
  }
};
var isPartMatch = (function(condition, clone, part) {
  if (is.function(condition)) {
    var wrapped = (function() {
      return condition.call(clone, part, clone);
    });
  } else if (is.string(condition)) {
    var wrapped = (function() {
      return condition === part;
    });
  } else if (is.regexp(condition)) {
    var wrapped = (function() {
      return condition.test(part);
    });
  } else {
    throw TypeError('unimplemented');
  }
  return wrapped();
});
if (typeof process !== 'undefined' && module.exports) {
  module.exports = use;
}

//# sourceURL=/home/ryan/Code/clouter.js/es6/use.js
}).call(this,require('_process'))
},{"_process":3,"is":1}]},{},[4]);
