import sonModule from './son'

const store = {
  state: {
    user: {},
  },
  getters: {
    user: (state) => state.user,
  },
  mutations: {
    setUser(state, val) {
      state.user = val;
    },
  },
  actions:{
    getUser(state){
      state.setUser({
        name:'binbin'
      })
    }
  },
  modules:{
    sonModule
  }
};

export default store;