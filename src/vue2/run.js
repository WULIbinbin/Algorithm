import Mvue from './main/index';
import Vuex from './vuex/index';

// const store = new Vuex.Store(
//   {
//     state: {
//       count: 0,
//     },
//   },
//   Mvue,
// );

Mvue.use(Vuex)

console.log(Mvue.prototype);

const vm = new Mvue({
  el: '#app',
  // store,
  data() {
    return {
      num1: '',
      num3: '333',
      num2: '',
      student: {
        name: 'binbin',
      },
    };
  },
  computed: {
    reduce() {
      // console.log('reduce计算了', this);
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
    'student.name': {
      handler(val) {
        console.log('student.name的watch', val);
      },
    },
  },
  created() {
    console.log('lifecycle created', this);
  },
  methods: {
    handleAdd() {
      this.num1 = Number(this.num1) + 1;
    },
  },
});

window.vm = vm;
