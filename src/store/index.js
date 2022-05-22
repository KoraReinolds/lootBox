import generateModule from '@/store/moduleGenerator';
import { createStore } from 'vuex';
import config from './config';
import lootBox from './lootBox';
import steps from './steps';
import actions from './actions';
import rarity from './rarity';
import general from './general';
import cost from './cost';

export default createStore(
  generateModule({
    state: {
    },
    getters: {
      rarity_: (state, getters, rootState, rootGetters) => rootGetters['steps/current_']?.rarityConfig || {},
      general_: (state, getters, rootState, rootGetters) => rootGetters['steps/current_']?.generalConfig || {},
      cost_: (state, getters, rootState, rootGetters) => rootGetters['steps/current_']?.costConfig || {},
      actions_: (state, getters, rootState, rootGetters) => rootGetters['steps/current_']?.costConfig || {},
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
      rarity,
      general,
      cost,
    },
  }),
);
