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
  const newPromise = new MyPromise((resolve, reject) => {
    const fulfilledCallBack = () => {
      try {
        // 创建一个微任务等待 newPromise 完成初始化
        queueMicrotask(() => {
          const x = onFulfilled(this.PromiseResult);
          resolvePromise(newPromise, x, resolve, reject);
        });
      } catch (error) {
        reject(error);
      }
    };
    const rejectedCallBack = () => {
      try {
        // 创建一个微任务等待 newPromise 完成初始化
        setTimeout(() => {
          const x = onRejected(this.PromiseResult);
          resolvePromise(newPromise, x, resolve, reject);
        });
      } catch (error) {
        reject(error);
      }
    };
    if (this.PromiseState === EPromiseState.Pending) {
      this.onFulfilledCallBack.push(fulfilledCallBack);
      this.onRejectedCallBack.push(rejectedCallBack);
    }
    if (this.PromiseState === EPromiseState.Fulfilled) {
      fulfilledCallBack();
    }
    if (this.PromiseState === EPromiseState.Rejected) {
      rejectedCallBack();
    }
  });
  return newPromise;
};

function resolvePromise(newPromise, x, resolve, reject) {
  // console.log(newPromise, x);
  if (newPromise === x) {
    throw new Error('不能返回自身');
  }
  // 判断x是不是 MyPromise 实例对象
  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}
MyPromise.resolve = function resolve(value) {
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

// promise1
//   .then((res) => {
//     console.log('res1', res);
//     return promise3();
//   })
//   .then((res) => {
//     console.log('res1_1', res);
//   });

// promise2.then(
//   (res) => {
//     console.log('res2', res);
//   },
//   (err) => {
//     console.log('err2', err);
//   },
// );

// const resolve1 = MyPromise.resolve(1);
// const resolve2 = MyPromise.resolve(2);

// resolve1
//   .then((res) => {
//     console.log(res);
//     return resolve2;
//   })
//   .then((res) => {
//     console.log(res);
//   });

MyPromise.resolve()
  .then(() => {
    console.log(0);
    return MyPromise.resolve(4);
  })
  .then((res) => {
    console.log(res);
  });

MyPromise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });
