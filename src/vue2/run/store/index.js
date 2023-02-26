import Vue from '../../main/index';
import Vuex from '../../vuex/index';
import countModule from './count';
import userModule from './user';

export default new Vuex.Store(
  {
    getters: {},
    mutations: {
      getAny(state){
        console.log(state)
      }
    },
    actions: {},
    modules: {
      countModule,
      userModule,
    },
  },
  Vue,
);
