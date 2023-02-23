import Vue from '../../main/index';
import Vuex from '../../vuex/index';
import count from './count';
import user from './user';

export default new Vuex.Store(
  {
    getters: {},
    mutations: {},
    actions: {},
    modules: {
      count,
      user,
    },
  },
  Vue,
);
