import arrayToTree from './index';

const array = [
  {
    id: 1,
    pid: 0,
  },
  {
    id: 3,
    pid: 0,
  },
  {
    id: 14,
    pid: 1,
  },
  {
    id: 11,
    pid: 2,
  },
  {
    id: 2,
    pid: 0,
  },
  {
    id: 5,
    pid: 3,
  },
  {
    id: 8,
    pid: 11,
  },
  {
    id: 10,
    pid: 1,
  },
  {
    id: 21,
    pid: 8,
  },
  {
    id: 0,
    pid: null,
  },
];

const res = arrayToTree(array, 0);

console.log(res);
