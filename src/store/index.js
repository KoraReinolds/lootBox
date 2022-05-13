import { createStore } from 'vuex';
import config from './config';
import lootBox from './lootBox';
import steps from './steps';
import actions from './actions';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    config,
    lootBox,
    steps,
    actions,
  },
});
