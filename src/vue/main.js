import { Mvue } from './binding/index';

const vm = new Mvue({
  el: '#app',
  data() {
    return {
      num1: '',
      num2: '',
    };
  },
  computed: {
    reduce() {
      console.log('reduce', this);
      return this.num1 + this.num2;
    },
  },
});

window.vm = vm;

console.log(vm);
