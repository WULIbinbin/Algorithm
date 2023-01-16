import './index'

const greeting = 'My name is ${name}, age ${age}, I am a ${job.jobName}';
const employee = {
  name: 'XiaoMing',
  age: 11,
  job: {
    jobName: 'designer',
    jobLevel: 'senior',
  },
};
const result = greeting.render(employee);
console.log(result);
const result1 = greeting.render2(employee);
console.log(result1);