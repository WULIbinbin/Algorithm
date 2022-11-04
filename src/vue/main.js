import { Mvue } from './binding/index';

const vm = new Mvue({
  el: '#app',
  data() {
    return {
      name: '',
      sex: '',
    };
  },
});

window.vm = vm;

console.log(vm);
