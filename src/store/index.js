import generateModule from '@/store/moduleGenerator';
import { createStore } from 'vuex';
import config from './config';
import lootBox from './lootBox';
import steps from './steps';
import actions from './actions';
import rarity from './rarity';
import general from './general';

export default createStore(
  generateModule({
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
      rarity,
      general,
    },
  }),
);
