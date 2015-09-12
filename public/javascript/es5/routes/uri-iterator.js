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
var parseResource = (function(raw) {
  var parts = {};
  if (raw.indexOf('#') !== -1) {
    parts.hash = raw.slice(raw.indexOf('#') + 1);
    raw = raw.slice(0, raw.indexOf('#'));
  }
  if (raw.indexOf('?') !== -1) {
    var queryString = raw.slice(raw.indexOf('?') + 1);
    raw = raw.slice(0, raw.indexOf('?'));
    parts.params = queryString.split('&').map((function(pair) {
      return pair.split('=');
    })).map((function(pair) {
      return {
        key: pair[0],
        value: pair[1]
      };
    }));
  }
  parts.paths = raw.split('/').filter((function(part) {
    return part && part.length > 0;
  }));
  return parts;
});
var UriIterator = function(raw) {
  var $__0 = this;
  if (!(this instanceof UriIterator)) {
    return new UriIterator(raw);
  }
  this.data = parseResource(raw);
  this.peekNextPath = (function() {
    var isEmpty = is.undefined($__0.data.paths) || $__0.data.paths.length === 0;
    if (!isEmpty) {
      return $__0.data.paths[0];
    }
  });
  this.getNextPath = (function() {
    var result = $__0.peekNextPath();
    if (!is.undefined(result)) {
      $__0.data.paths.shift();
    }
    return result;
  });
  this.setNextPath = (function(value) {
    if (!is.undefined($__0.peekNextPath())) {
      $__0.data.paths[0] = value;
    }
  });
  this.peekNextPaths = (function() {
    var isEmpty = is.undefined($__0.data.paths) || $__0.data.paths.length === 0;
    if (!isEmpty) {
      return '/' + $__0.data.paths.join('/');
    }
  });
  this.getNextPaths = (function() {
    var result = $__0.peekNextPaths();
    $__0.data.paths = undefined;
    return result;
  });
  this.setNextPaths = (function(value) {
    $__0.data.paths = value.split('/').filter((function(path) {
      return path.length > 0;
    }));
  });
  this.peekHash = (function() {
    if (!is.undefined($__0.data.hash)) {
      return $__0.data.hash;
    }
  });
  this.getHash = (function() {
    var result = $__0.peekHash();
    $__0.data.hash = undefined;
    return result;
  });
  this.setHash = (function(value) {
    $__0.data.hash = value;
  });
  this.peekWholeHash = (function() {
    if (!is.undefined($__0.data.hash)) {
      return '#' + $__0.data.hash;
    }
  });
  this.getWholeHash = (function() {
    var result = $__0.peekWholeHash();
    $__0.data.hash = undefined;
    return result;
  });
  this.setWholeHash = (function(value) {
    $__0.data.hash = value.replace(/^[#]/g, '');
  });
  this.peekWholeParams = (function() {
    var isEmpty = is.undefined($__0.data.params) || $__0.data.params.length === 0;
    if (!isEmpty) {
      return '?' + $__0.data.params.map((function(pair) {
        return pair.key + '=' + pair.value;
      })).join('&');
    }
  });
  this.getWholeParams = (function() {
    var params = $__0.peekWholeParams();
    $__0.data.params = undefined;
    return params;
  });
  this.setWholeParams = (function(value) {
    $__0.data.params = is.undefined(value) ? undefined : value.replace(/^[?]/g, '').split('&').map((function(pair) {
      return pair.split('=');
    })).map((function(pair) {
      return {
        key: pair[0],
        value: pair[1]
      };
    }));
  });
  this.peekNextParam = (function() {
    var isEmpty = is.undefined($__0.data.params) || $__0.data.params.length === 0;
    if (!isEmpty) {
      return $__0.data.params[0];
    }
  });
  this.getNextParam = (function() {
    var result = $__0.peekNextParam();
    var isEmpty = is.undefined($__0.data.params) || $__0.data.params.length === 0;
    if (!isEmpty) {
      $__0.data.params.shift();
    }
    return result;
  });
  this.setNextParam = (function(key, value) {
    if (!is.undefined($__0.peekNextParam())) {
      $__0.data.params[0] = {
        key: key,
        value: value
      };
    }
  });
  this.peekParams = (function() {
    if (!is.undefined($__0.peekNextParam())) {
      return $__0.data.params;
    }
  });
  this.getParams = (function() {
    var result = $__0.peekParams();
    $__0.data.params = undefined;
    return result;
  });
  this.peekWhole = (function() {
    return [$__0.peekNextPaths(), $__0.peekWholeParams(), $__0.peekWholeHash()].filter((function(part) {
      return part && part.length > 0;
    })).join('');
  });
  this.getWhole = (function() {
    var result = $__0.peekWhole();
    ;
    ['hash', 'paths', 'params'].forEach((function(key) {
      $__0.data[key] = undefined;
    }));
    return result;
  });
  this.setWhole = (function(value) {
    var iter = UriIterator(value);
    $__0.data = iter.data;
  });
  return this;
};
UriIterator.fromUriIterator = (function(iterator) {
  var raw = [iterator.peekNextPaths(), iterator.peekWholeParams(), iterator.peekHash()].filter((function(part) {
    return part && part.length > 0;
  })).join('');
  return new UriIterator(raw);
});
UriIterator.fromLocation = (function(location) {
  var raw = [location.pathname, location.search, location.hash].filter((function(part) {
    return part && part.length > 0;
  })).join('');
  return new UriIterator(raw);
});
UriIterator.fromPath = (function(path) {
  return new UriIterator(path.getPath());
});
if (typeof process !== 'undefined' && module.exports) {
  module.exports = UriIterator;
}

//# sourceURL=/home/ryan/Code/clouter.js/es6/uri-iterator.js
}).call(this,require('_process'))
},{"_process":3,"is":1}]},{},[4]);
