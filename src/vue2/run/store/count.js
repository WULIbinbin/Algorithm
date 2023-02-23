const store = {
  state: {
    count: 0,
  },
  getters: {
    getCount: (state) => state.count,
  },
  mutations: {
    setCount(state, val) {
      console.log(val);
      state.count = val;
    },
  },
};

export default store;
