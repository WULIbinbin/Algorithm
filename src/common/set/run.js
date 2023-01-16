import { _set } from './index';

const obj = {
  a: '1',
  b: {
    c: '2',
    d: {
      e: '3',
      f: {
        g: '4',
      },
    },
  },
};

_set(obj, 'b.c', '66');
_set(obj, 'b.d.f.g', '99');

console.log(obj);
