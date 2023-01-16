import Mvue from './index';

const vm = new Mvue({
  el: '#app',
  data() {
    return {
      num1: '',
      num3: '333',
      num2: '',
      student:{
        name:'binbin'
      }
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
    'student.name':{
      handler(val) {
        console.log('student.name的watch', val);
      },
    }
  },
  methods: {
    handleAdd() {
      this.num1 = Number(this.num1) + 1;
    },
  },
});

window.vm = vm;