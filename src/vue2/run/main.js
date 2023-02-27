import Mvue from '../main/index';
import Vuex, { mapMutations, mapActions, mapGetters } from '../vuex/index';
import store from './store/index';

Mvue.use(Vuex);

console.log(store);

const vm = new Mvue({
  el: '#app',
  store,
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
    ...mapGetters('userModule', ['user']),
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
    console.log('created', this);
    this.$store.commit('countModule/setCount', 2);
  },
  methods: {
    ...mapMutations('countModule', ['setCount']),
    ...mapActions('userModule', ['userLogin']),
    handleNumAdd() {
      this.num1 = Number(this.num1) + 1;
    },
    handleCountAddByCommit() {
      this.$store.commit('countModule/setCount', this.$store.state.countModule.count + 1);
    },
    handleCountAddByMutation() {
      this.setCount(this.$store.state.countModule.count + 1);
    },
    handleChangeUserByAction() {
      this.userLogin();
    },
  },
});

window.vm = vm;
