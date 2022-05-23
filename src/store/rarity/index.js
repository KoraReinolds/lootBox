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

    addNewAction({ dispatch, state }) {
      dispatch('actions', [...state.actions, { ...defaultAction }]);
      dispatch('actions/actionIndex', state.actions.length - 1, { root: true });
    },

  },

});

export { rarityConfig };
