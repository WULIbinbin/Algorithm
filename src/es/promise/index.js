import { isTypeOf } from '../../utils/tools';

/**
 *  Promise对象解析
 *
 *  @PromiseState
 *    1、PromiseState 有三种状态，fulfilled、rejected、pending。
 *    2、PromiseState 只能从 pending 到 rejected, 或者从 pending 到 fulfilled。
 *    3、PromiseState 的状态一旦确认，就不会再改变。
 *
 *  @PromiseResult
 *    1、pending 时为 undefined，fulfilled 和 rejected 时跟随传入的参数。
 *
 *  @resolver
 *    1、new Promise 实例必须添加一个 resolver 回调函数作为参数，resolver 需包含 resolve 和 reject 两个参数。
 *
 *  @then
 *    1、then 方法需要两个参数，第一个参数作为处理已兑现状态(fulfilled)的回调函数，而第二个参数则作为处理已拒绝状态的回调函数。
 *    2、如果 promise 已经成功，则执行 onFulfilled，并将 resolve 的值作为参数传递进去。
 *    3、如果 promise 已经失败，那么执行 onRejected, 并将 reject 失败的原因作为参数传递进去。
 *    4、如果 promise 的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行(发布订阅)。
 *    5. then 的参数 onFulfilled 和 onRejected 可以缺省。
 *    6、每一个then 方法还会返回一个新生成的 promise 对象，这个对象可被用作链式调用。
 *    7、如果 then 方法中 return 了一个结果，那么就会把这个结果作为参数，传递给下一个 then 的成功的回调(onFulfilled)。
 *    8、如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调(onRejected)。
 *    9、如果 then 返回的是一个 promise，那么会等待这个 promise 执行完，promise 如果成功，就走下一个then的(onFulfilled)，如果失败，就走下一个then的(onRejected)。
 *
 */

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
function MyPromise(resolver) {
  const that = this;
  this.PromiseState = PENDING;
  this.PromiseResult = undefined;
  this.onFulfilledCallBack = [];
  this.onRejectedCallBack = [];

  try {
    if (!isTypeOf(resolver, 'function')) {
      throw new Error('请添加回调函数');
    }
    resolver(resolve, reject);
  } catch (error) {
    reject(error);
  }
  function resolve(value) {
    if (that.PromiseState === PENDING) {
      that.PromiseState = FULFILLED;
      that.PromiseResult = value;
      // 因为一个Promise可以有多个then函数，可以有多个地方调用。
      // 为了多个then函数内部之间互不干扰，做类似发布订阅的操作，把then的回调函数放在数组里，
      // 确保每个then里的回调函数都能被调用。
      // PromiseA+ 2.2.6.1
      that.onFulfilledCallBack.forEach((cb) => cb(value));
    }
  }
  function reject(reason) {
    if (that.PromiseState === PENDING) {
      that.PromiseState = REJECTED;
      that.PromiseResult = reason;
      // PromiseA+ 2.2.6.2
      that.onRejectedCallBack.forEach((cb) => cb(reason));
    }
  }
}

MyPromise.prototype.then = function then(onFulfilled, onRejected) {
  // PromiseA+ 2.2.1 / PromiseA+ 2.2.5 / PromiseA+ 2.2.7.3 / PromiseA+ 2.2.7.4
  // onFulfilled和onRejected必须是函数类型
  if (!isTypeOf(onFulfilled, 'function')) {
    onFulfilled = (value) => value;
  }
  if (!isTypeOf(onRejected, 'function')) {
    onRejected = (reason) => {
      throw reason;
    };
  }
  // PromiseA+ 2.2.7
  const newPromise = new MyPromise((resolve, reject) => {
    const fulfilledCallBack = () => {
      // 创建一个微任务等待 newPromise 完成初始化
      // setTimeout 模拟 queueMicrotask 微任务
      // 作用：由于 resolvePromise 需要拿到 MyPromise 完成初次化后的 newPromise 变量，
      // 来判断 then 返回值是否为 newPromise 本身，必须要创建新的任务，去等待 -
      // MyPromise 初始化完成后再去调用。
      // PromiseA+ 2.2.4 --- setTimeout
      setTimeout(() => {
        try {
          const x = onFulfilled(this.PromiseResult);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    };
    const rejectedCallBack = () => {
      setTimeout(() => {
        try {
          const x = onRejected(this.PromiseResult);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    };
    if (this.PromiseState === PENDING) {
      this.onFulfilledCallBack.push(fulfilledCallBack);
      this.onRejectedCallBack.push(rejectedCallBack);
    }
    if (this.PromiseState === FULFILLED) {
      // PromiseA+ 2.2.2
      fulfilledCallBack();
    }
    if (this.PromiseState === REJECTED) {
      // PromiseA+ 2.2.3
      rejectedCallBack();
    }
  });
  return newPromise;
};

function resolvePromise(newPromise, x, resolve, reject) {
  // PromiseA+ 2.3.1
  if (newPromise === x) {
    throw new TypeError('Chaining cycle:不能返回自身');
  }
  // 判断x是不是 MyPromise 实例对象
  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}
MyPromise.resolve = function resolve(value) {
  if (value instanceof MyPromise) return value;
  return new MyPromise((resolve) => {
    resolve(value);
  });
};

MyPromise.reject = function reject(value) {
  return new MyPromise((resolve, reject) => {
    reject(value);
  });
};

const promise1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('promise------1');
  }, 2000);
});

const promise2 = new MyPromise((resolve, reject) => {
  try {
    const add = null;
    console.log(add());
    resolve('promise------2');
  } catch (err) {
    reject(err);
  }
});

const promise3 = () =>
  new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('promise------3');
    }, 1000);
  });

promise1
  .then((res) => {
    console.log('res1', res);
    return promise3();
  })
  .then((res) => {
    console.log('res1_1', res);
  });

promise2.then(
  (res) => {
    console.log('res2', res);
  },
  (err) => {
    console.log('err2', err);
  },
);

// const resolve1 = Promise.resolve(1);
// const resolve2 = Promise.resolve(2);
// const reject1 = Promise.reject(new Error(31));
// const reject2 = Promise.reject(new Error(32));

// const resolve1 = MyPromise.resolve(1);
// const resolve2 = MyPromise.resolve(2);
// const reject1 = MyPromise.reject(new Error(31));
// // const reject2 = MyPromise.reject(new Error(32));

// resolve1
//   .then(
//     (res) => {
//       console.log('res1', res);
//       return resolve2;
//     },
//     (err) => {
//       console.log('err1', err);
//     },
//   )
//   .then(
//     (res) => {
//       console.log(that)
//       console.log('res2', res);
//     },
//     (err) => {
//       console.log('err2', err);
//     },
//   );

// MyPromise.resolve()
//   .then(() => {
//     console.log(0);
//     return MyPromise.resolve(4);
//   })
//   .then((res) => {
//     console.log(res);
//   });

// MyPromise.resolve()
//   .then(() => {
//     console.log(1);
//   })
//   .then(() => {
//     console.log(2);
//   })
//   .then(() => {
//     console.log(3);
//   })
//   .then(() => {
//     console.log(5);
//   })
//   .then(() => {
//     console.log(6);
//   });

export default MyPromise;
