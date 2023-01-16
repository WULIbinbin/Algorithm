// 问题：写个简单的模板解析器，输出对应的字符串
// var greeting = 'My name is ${name}, age ${age}, I am a ${job.jobName}';
// var employee = {
//     name: 'XiaoMing',
//     age: 11,
//     job: {
//         jobName: 'designer',
//         jobLevel: 'senior'
//     }
// };
// var result = greeting.render(employee);
// console.log(result);

// ES6 new Function 构建新的函数（类似eval）
String.prototype.render = function (obj) {
  const str = `return \`${this}\``; // 多加一层``，防止变量提前解析
  const keys = Object.keys(obj);
  const values = keys.map((key) => obj[key]);
  const fn = new Function(...keys, str);
  return fn(...values);
};

// 使用正则
String.prototype.render2 = function (obj) {
  const str = this;
  const reg = /\${([.\w]+)}/g;
  return str.replace(reg, (match, p1) => {
    const keys = p1?.split('.');
    let value = obj;
    keys.forEach((key) => {
      value = value[key];
    });
    return value;
  });
};
