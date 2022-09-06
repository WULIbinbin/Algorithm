/**
 *  Promise对象解析
 *  @Prototype 自己
 *  @PromiseState 三种，resolved、rejected、pending。
 *  @PromiseResult pending为undefined，resolved和rejected时跟随传入的参数。
 */
function MyPromise(excute) {
  try {
    const that = this;
    this.PromiseState = "pending";
    this.PromiseResult;
    
    function resolve(value) {
      console.log("resolve", value);
      if (that.PromiseState === "pending") {
        that.PromiseState = "resolved";
        that.PromiseResult = value;
      }
    }
    function reject(reason) {
      console.log("reject", reason);
    }
    if (typeof excute !== "function") {
      throw new Error("请添加回调函数");
    }
    excute(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

MyPromise.prototype.then = function (callBack) {
  return callBack(this.PromiseResult);
};

MyPromise.prototype.catch = function (callBack) {
  console.log("catch error");
  return callBack();
};

MyPromise.prototype.finally = function () {
  console.log("finally");
};

const promise1 = new MyPromise((resolve, reject) => {
  resolve(2333);
});

console.log("promise1", promise1);

const then1 = promise1.then((res) => {
  console.log("then1 result", res);
  return 6666;
});

console.log(then1);
