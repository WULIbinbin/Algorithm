const store = {
  state: {
    son: {
      name:'bb'
    },
  },
  getters: {
    son: (state) => state.son,
  },
  mutations: {
    setSon(state, val) {
      state.son = val;
    },
  },
};

export default store;
