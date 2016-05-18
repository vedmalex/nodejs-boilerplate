const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

export default function Promise(fn) {
  let state = PENDING;
  let value = null;
  let handlers = [];

  function fulfill(result) {
    state = FULFILLED;
    value = result;
    handlers.forEach(handle);
    handlers.length = 0;
  }

  function reject(error) {
    state = REJECTED;
    value = error;
    handlers.forEach(handle);
    handlers.length = 0;
  }

  function resolve(result) {
    try {
      let then = getThen(result);
      if (then) {
        doResolve(then.bind(result), resolve, reject);
      } else {
        fulfill(result);
      }
    } catch (e) {
      reject(e);
    }
  }

  function handle(handler) {
    if (state === PENDING) {
      handlers.push(handler);
    } else {
      if (state === FULFILLED && typeof handler.onFulfilled === 'function') {
        handler.onFulfilled(value);
      }
      if (state === REJECTED && typeof handler.onRejected === 'function') {
        handler.onRejected(value);
      }
    }
  }

  this.done = function(onFulfilled, onRejected) {
    // ensure we are always asynchronous
    setTimeout(() => {
      handle({
        onFulfilled: onFulfilled,
        onRejected: onRejected
      });
    }, 0);
  };

  this.then = function(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      return this.done(
        result => {
          if (typeof onFulfilled === 'function') {
            try {
              return resolve(onFulfilled(result));
            } catch (ex) {
              return reject(ex);
            }
          } else {
            return resolve(result);
          }
        },
        error => {
          if (typeof onRejected === 'function') {
            try {
              return resolve(onRejected(error));
            } catch (ex) {
              return reject(ex);
            }
          } else {
            return reject(error);
          }
        }
      );
    });
  };

  doResolve(fn, resolve, reject);
}

function getThen(value) {
  var t = typeof value;
  if (value && (t === 'object' || t === 'function')) {
    var then = value.then;
    if (typeof then === 'function') {
      return then;
    }
  }
  return null;
}

function doResolve(fn, onFulfilled, onRejected) {
  var done = false;
  try {
    fn(function(value) {
      if (!done) {
        done = true;
        onFulfilled(value);
      }
    }, function(reason) {
      if (!done) {
        done = true;
        onRejected(reason);
      }
    });
  } catch (ex) {
    if (!done) {
      done = true;
      onRejected(ex);
    }
  }
}
