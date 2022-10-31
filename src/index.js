// import './es/index';
// import './data-structure/tree/binaryTree/run';
import { Mvue } from './es/vue/binding';

const vm = new Mvue({
  el: '#app',
  data() {
    return {
      name: 'binbin',
      sex: 'man',
    };
  },
});

window.vm = vm;

console.log(vm);
