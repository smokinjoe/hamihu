/*
 * Useful functions
 */

function success (name) {
	console.log("JOE: Success: ", name);
}

function failure (name) {
  console.log("JOE: Error: ", name);
}

function assert (bool, name) {
  if (bool) {
    success(name);
  }
  else {
    failure(name);
  }
}

function sync_return (value) {
  var p = new promise.Promise();
  p.done(null, value);
  return p;
}

function async_return(value) {
  var p = new promise.Promise();
  setTimeout(function () {
    p.done(null, value);
  });
  return p;
}

function late (n) {
  var p = new promise.Promise();
  setTimeout(function () {
    p.done(null, n);
  }, n);
  return p;
}

/*
 * Tests
 */

function test_simple_synchronous () {
  sync_return(123).then(function (error, result) {
    assert(result === 123, 'simple synchronous test');
  });
}

function test_simple_asynchronous () {
  p = new promise.Promise();
  p.then(function (res, a, b, c) {
    assert(a === 1, 'multiple results (1/3)');
  });

  setTimeout(
    function () {
      p.then(function (res, a, b, c) {
        assert(b === 2, 'multiple results (2/3)');
      });

      p.done(null, 1, 2, 3);

      p.then(function (res, a, b, c) {
        assert(c === 3, 'multiple results (3/3)');
      });
  });
}

function test_join () {
  var d = new Date();

  promise.join([late(400), late(800)]).then(function (results) {
    var delay = new Date() - d;
    assert(results[0][1] === 400 && results[1][1] === 800, "join() result");
    assert(700 < delay && delay < 900, "joining functions");
  });
}

function test_join_empty () {

}















































