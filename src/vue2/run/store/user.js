import sonModule from './son';

let timer = null;
const store = {
  state: {
    user: {},
  },
  getters: {
    user: (state) => JSON.stringify(state.user),
  },
  mutations: {
    setUser(state, val) {
      state.user = val;
    },
  },
  actions: {
    userLogin({ state, commit }) {
      console.log(state);
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        commit('setUser', {
          name: 'binbin',
        });
      }, 1000);
    },
  },
  modules: {
    sonModule,
  },
};

export default store;
