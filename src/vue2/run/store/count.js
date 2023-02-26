const store = {
  state: {
    count: 0,
  },
  getters: {
    count: (state) => state.count,
  },
  mutations: {
    setCount(state, val) {
      state.count = val;
    },
  },
};

export default store;
