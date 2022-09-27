const { MyPromise } = require('./dist-promise/es.umd');

MyPromise.deferred = function () {
  const result = {};
  result.promise = new MyPromise((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
};

module.exports = MyPromise;
