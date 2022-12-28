import cloneDeep from './index';

const obj1 = {
  id: 10,
  str: 'hi',
  info: {
    name: 'ben',
  },
  subject: [
    {
      name: 'english',
      score: 100,
    },
    {
      name: 'math',
      score: 95,
    },
  ],
};

const obj2 = cloneDeep(obj1);

obj2.id = 20;
obj2.subject[0].score = 60

console.log(obj1);

console.log(obj2);
