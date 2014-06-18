/**
 * memoried 0.1.0
 * https://github.com/open-node/memoried
 * (c) 2014-2014 Redston Zhao code, document
 * Underscore may be freely distributed under the MIT license.
 */

(function() {
  var toString = Object.prototype.toString
    , __slice = [].slice
    , data
    , flash
    , wrapper
    , wrapperSync
    , memoried
    , isFunction = function(value) {
      return toString.call(value) == '[object Function]';
    };

  data = {};

  setInterval(function() {
    var cache, key, now;
    now = Date.now();
    for (key in data) {
      cache = data[key];
      if (now < cache.expired) {
        delete data[key];
      }
    }
    return true;
  }, 300 * 1000);

  flash = {
    get: function(key) {
      var cache;
      cache = data[key];
      if (!cache) {
        return null;
      }
      if (cache.expired > Date.now()) {
        return cache.value;
      }
      delete data[key];
      return null;
    },
    set: function(key, value, life) {
      var expired;
      if (life == null) {
        life = 600;
      }
      expired = Date.now() + life * 1000;
      data[key] = {
        expired: expired,
        value: value
      };
      return true;
    }
  };

  wrapperSync = function(key, func, life, bind) {
    var regxp = /\{(\d+)\}/g
      , keyReplace = regxp.test(key);
    return function() {
      var cacheKey
        , args = arguments.length ? __slice.call(arguments, 0) : []
        , ret;
      if (keyReplace) {
        cacheKey = key.replace(/\{(\d+)\}/g, function(m, i) {
          return args[i];
        });
      } else {
        cacheKey = key;
      }
      ret = flash.get(cacheKey);
      if (ret) {
        return ret;
      }
      ret = func.apply(bind, args);
      flash.set(cacheKey, ret, life);
      return ret;
    };
  };

  wrapper = function(key, func, life, bind) {
    var regxp = /\{(\d+)\}/g
      , keyReplace = regxp.test(key);
    return function() {
      var cacheKey
        , args = arguments.length ? __slice.call(arguments, 0) : []
        , ret
        , callback = args.pop();
      if (keyReplace) {
        cacheKey = key.replace(/\{(\d+)\}/g, function(m, i) {
          return args[i];
        });
      } else {
        cacheKey = key;
      }
      ret = flash.get(cacheKey);
      if (ret) {
        return callback(null, ret);
      }
      args.push(function(error, result) {
        if (error) {
          return callback(error, result)
        }
        flash.set(cacheKey, result, life);
        callback(error, result);
      });
      func.apply(bind, args);
    };
  };

  memoried = function(key, value, life, opts) {
    var len = arguments.length
      , bind
      , opts = opts || {};

    if (len === 0) {
      throw Error('argument Error, must has argument 1 more');
    } else if (arguments.length === 1) {
      return flash.get(key);
    } else if (isFunction(value)) {
      bind = opts && (opts.bind || this);
      if (opts.sync) {
        return wrapperSync(key, value, life, bind);
      } else {
        return wrapper(key, value, life, bind);
      }
    } else {
      return flash.set(key, value, life);
    }
  };

  if (module && module.exports) {
    module.exports = memoried;
  } else if (window) {
    window.memoried = memoried;
  }

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('memoried', [], function() {
      return memoried;
    });
  }

}).call(this);
