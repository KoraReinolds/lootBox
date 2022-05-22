import generateModule from '@/store/moduleGenerator';
import { defaultAction } from '@/store/actions/current';

const rarityConfig = {
  chance: '0',
  actions: [],
};

export default generateModule({
  namespaced: true,

  state: { ...rarityConfig },

  stateLink: 'rarity_',

  actions: {

    addNewAction({
      dispatch, commit, state, rootGetters,
    }) {
      // eslint-disable-next-line dot-notation
      const actions = rootGetters[state.stateLink]?.actions;

      dispatch('actions', [...actions, { ...defaultAction }]);
      commit('actions/actionIndex', actions.length, { root: true });
    },

  },

});

export { rarityConfig };
