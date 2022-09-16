import { isTypeOf } from '@/utils/tools';

/**
 *  Promise对象解析
 *  @Prototype 自己
 *  @PromiseState 三种，fulfilled、rejected、pending。
 *  @PromiseResult pending为undefined，fulfilled和rejected时跟随传入的参数。
 *  @then .then() 方法需要两个参数，第一个参数作为处理已兑现状态（fulfilled）的回调函数，而第二个参数则作为处理已拒绝状态的回调函数。
 *        每一个 .then() 方法还会返回一个新生成的 promise 对象，这个对象可被用作链式调用。
 *
 *  new Promise过程解析
 *  @resolver Promise实例必须添加一个resolver回调函数作为参数，resolver需包含resolve和reject两个参数
 *
 */

const EPromiseState = {
  Pending: 'pending',
  Fulfilled: 'fulfilled',
  Rejected: 'rejected',
};
function MyPromise(resolver) {
  const that = this;
  this.PromiseState = EPromiseState.Pending;
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
    if (that.PromiseState === EPromiseState.Pending) {
      that.PromiseState = EPromiseState.Fulfilled;
      that.PromiseResult = value;
      // 因为一个Promise可以有多个then函数，可以有多个地方调用。
      // 为了多个then函数内部之间互不干扰，做类似发布订阅的操作，把then的回调函数放在数组里，
      // 确保每个then里的回调函数都能被调用。
      that.onFulfilledCallBack.forEach((cb) => cb(value));
    }
  }
  function reject(reason) {
    if (that.PromiseState === EPromiseState.Pending) {
      that.PromiseState = EPromiseState.Fulfilled;
      that.PromiseResult = reason;
      that.onRejectedCallBack.forEach((cb) => cb(reason));
    }
  }
}

MyPromise.prototype.then = function then(onFulfilled, onRejected) {
  if (!isTypeOf(onFulfilled, 'function')) {
    onFulfilled = (value) => value;
  }
  if (!isTypeOf(onRejected, 'function')) {
    onRejected = (reason) => reason;
  }
  console.log(onFulfilled);
  const newPromise = new MyPromise((resolve, reject) => {
    console.log(this.PromiseState);
    if (this.PromiseState === EPromiseState.Pending) {
      this.onFulfilledCallBack.push(onFulfilled);
      this.onRejectedCallBack.push(onRejected);
    }
    if (this.PromiseState === EPromiseState.Fulfilled) {
      const x = onFulfilled(this.PromiseResult);
      resolvePromise(newPromise, x, resolve, reject);
    }
    if (this.PromiseState === EPromiseState.Rejected) {
      onRejected(this.PromiseResult);
    }
  });
  return newPromise;
};

function resolvePromise(newPromise, x, resolve, reject) {
  if (newPromise === x) {
    throw new Error('不能返回自身');
  }
  // 判断x是不是 MyPromise 实例对象
  console.log(x);
  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}

const promise1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('promise------1');
  }, 2000);
});

const promise2 = new MyPromise((resolve, reject) => {
  try {
    console.log(that.add());
    setTimeout(() => {
      resolve('promise------2');
    }, 2000);
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

// promise2.then(
//   (res) => {
//     console.log('res2', res);
//   },
//   (err) => {
//     console.log('err2', err);
//   },
// );

console.log('promise1', promise1);
