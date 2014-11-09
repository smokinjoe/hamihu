/*
 *
 * Copyright 2012-2014 (c) Pierre Duquesne <stackp@online.fr>
 * Licensed under the New BSD License.
 * https://github.com/stackp/promisejs
 */

(function (exports) {

  function Promise () {
    this._callbacks = [];
  }

  Promise.prototype.then = function (func, context) {
    var p;
    if (this._isdone) {
      p = func.apply(context, this.result);
    }
    else {
      p = new Promise();
      this._callbacks.push(function () {
        var res = func.apply(context, arguments);
        if (res && typeof res.then === 'function') {
          res.then(p.done, p);
        }
      });
    }
    return p;
  };

  Promise.prototype.done = function () {
    this.result = arguments;
    this._isdone = true;
    for (var i = 0; i < this._callbacks.length; i++) {
      this._callbacks[i].apply(null, arguments);
    }
    this._callbacks = [];
  };

  function join (promises) {
    var p = new Promise();
    var results = [];

    if (!promises || !promises.length) {
      p.done(results);
      return p;
    }

    var numdone = 0;
    var total = promises.length;

    function notifier (i) {
      return function () {
        numdone += 1;
        results[i] = Array.prototype.slice.call(arguments);
        if (numdone === total) {
          p.done(results);
        }
      };
    }

    for (var i = 0; i < total; i++) {
      promises[i].then(notifier(i));
    }

    return p;
  }

  function chain(funcs, args) {
    var p = new Promise(0);
      if (funcs.length === 0) {
        p.done.apply(p, args);
      }
      else {
        funcs[0].apply(null, args).then(function () {
          funcs.splice(0, 1);
          chain(funcs, arguments).then(function () {
            p.done.apply(p, arguments);
          });
        });
      }
    return p;
  }

  /*
   * AJAX requests
   */

  function _encode (data) {
    var result = "";
    if (typeof data === "string") {
      result = data;
    }
    else {
      var e = encodeURIComponent;
      for (var k in data) {
        if (data.hasOwnProperty(k)) {
          result += '&' + e(k) + '=' + e(data[k]);
        }
      }
    }
    return result;
  }









}(this));


























































































