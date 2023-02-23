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
      console.log(val);
      state.son = val;
    },
  },
};

export default store;
