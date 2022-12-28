import Mvue from './instance/index';

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
      return Number(this.num1) + Number(this.num2);
    },
  },
  watch: {
    num1(val) {
      console.log('num1', val);
    },
    num2: {
      handler(val) {
        console.log('num2', val);
      },
    },
  },
});

window.vm = vm;

console.log(vm);
