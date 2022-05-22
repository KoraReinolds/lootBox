import generateModule from '@/store/moduleGenerator';
import current from './current';

export default generateModule({
  namespaced: true,

  state: {
    lootBoxIndex: undefined,
  },

  getters: {
    current_: (state, getters, rootState, rootGetters) => rootGetters['config/data/lootBoxes'][state.lootBoxIndex] || {},
  },

  modules: {
    current,
  },

});
