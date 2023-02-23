const store = {
  state: {
    user: {},
  },
  getters: {
    getUserInfo: (state) => state.user,
  },
  mutations: {
    setUser(state, val) {
      console.log(val);
      state.user = val;
    },
  },
};

export default store;
