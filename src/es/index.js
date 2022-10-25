import promise from './promise';

export const MyPromise = promise;

// 测试代码

// const promise1 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('promise------1');
//   }, 2000);
// });

// const promise2 = new MyPromise((resolve, reject) => {
//   try {
//     const add = null;
//     console.log(add());
//     resolve('promise------2');
//   } catch (err) {
//     reject(err);
//   }
// });

// const promise3 = () =>
//   new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('promise------3');
//     }, 1000);
//   });

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

// const resolve1 = Promise.resolve(1);
// const resolve2 = Promise.resolve(2);
// const reject1 = Promise.reject(new Error(31));
// const reject2 = Promise.reject(new Error(32));

// const resolve1 = MyPromise.resolve(1);
// const reject1 = MyPromise.reject(new Error(31));
// const reject2 = MyPromise.reject(new Error(32));

// resolve2
//   .then((res) => 2)
//   .then(
//     (res) => {
//       console.log(res);
//     },
//     (err1) => {
//       console.log('err1', err1);
//     },
//   );

// resolve1
//   .then((res) => 2)
//   .then(
//     (res) => {
//       console.log('res2_2', res);
//     },
//     (err) => {
//       console.log('err2_2', err);
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
