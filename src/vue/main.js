import { Mvue } from './binding/index';

const vm = new Mvue({
  el: '#app',
  data() {
    return {
      num1: '',
      num3: '333',
      num2: '',
    };
  },
  computed: {
    reduce() {
      console.log('reduce计算了', this);
      return Number(this.num1) + Number(this.num2)
    },
  },
});

window.vm = vm;

console.log(vm);
