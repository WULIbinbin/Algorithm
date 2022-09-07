import { isTypeOf } from '@/utils/tools';

/**
 *  Promise对象解析
 *  @Prototype 自己
 *  @PromiseState 三种，resolved、rejected、pending。
 *  @PromiseResult pending为undefined，resolved和rejected时跟随传入的参数。
 *
 *  new Promise过程解析
 *  @resolver Promise实例必须添加一个resolver回调函数作为参数
 */
function MyPromise(resolver) {
  const that = this;
  this.PromiseState = 'pending';
  this.PromiseResult = undefined;
  this.onResolveCallBack = [];
  this.onRejectCallBack = [];
  try {
    if (!isTypeOf(resolver, 'function')) {
      throw new Error('请添加回调函数');
    }
    resolver(resolve, reject);
  } catch (error) {
    console.log(error);
    console.log(that.catch);
    reject(error);
  }
  function resolve(value) {
    if (that.PromiseState === 'pending') {
      that.PromiseState = 'resolved';
      that.PromiseResult = value;
      that.onResolveCallBack.forEach((cb) => cb(value));
    }
  }
  function reject(reason) {
    if (that.PromiseState === 'pending') {
      that.PromiseState = 'rejected';
      that.PromiseResult = reason;
      that.onRejectCallBack.forEach((cb) => cb(reason));
    }
  }
}

MyPromise.prototype.then = function then(callBack) {
  if (!isTypeOf(callBack, 'function') || !isTypeOf(this.onResolveCallBack, 'array')) return;
  this.onResolveCallBack.push(callBack);
  return this;
};

MyPromise.prototype.catch = function myCatch(callBack) {
  if (!isTypeOf(callBack, 'function') || !isTypeOf(this.onRejectCallBack, 'array')) return;
  this.onRejectCallBack.push(callBack);
  return this;
};

MyPromise.prototype.finally = function myFinally() {
  console.log('finally');
};

console.log(MyPromise);

const promise1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('promise------1');
  }, 1000);
});

const promise2 = new MyPromise((resolve, reject) => {
  // console.log(that.add());
  resolve('promise------2');
  // setTimeout(() => {

  // }, 2000);
});

console.log('promise2', promise2);

const then1 = promise1
  .then((res) => {
    console.log('then1 result', res);
    return 'then1';
  })
  .catch((err) => {
    console.log('then1 error', err);
  });

const then2 = promise2
  .then((res) => {
    console.log('then2 result', res);
    return 'then2';
  })
  .catch((err) => {
    console.log('then2 error', err);
  });

console.log(then1, then2);
