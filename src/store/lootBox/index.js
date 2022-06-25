import generateModule from '@/store/moduleGenerator';
import current from './current';

export default generateModule({
  namespaced: true,

  state: {
    lootBoxIndex: 0,
  },

  getters: {
    current_: (state, getters, rootState, rootGetters) => Object.fromEntries(
      Object.entries(
        rootGetters['config/data/lootBoxes'][state.lootBoxIndex] || {},
      ).map(([key, val]) => ([key, { ...val, name: key }])),
    ),
  },

  modules: {
    current,
  },

});
