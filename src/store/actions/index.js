import generateModule from '@/store/moduleGenerator';
import current from './current';

export default generateModule({
  namespaced: true,

  state: {
    actionIndex: undefined,
  },

  getters: {
    current_: (state, getters, rootState, rootGetters) => {
      // eslint-disable-next-line dot-notation
      const { actions } = rootGetters['rarity_'];

      return actions?.[state.actionIndex] || {};
    },
  },

  modules: {
    current,
  },

});
