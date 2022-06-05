import generateModule from '@/store/moduleGenerator';
import { defaultAction } from '@/store/actions/current';

const rarityActiveConfig = {
  chance: '100',
  actions: [{ ...defaultAction }],
};

const rarityInactiveConfig = {
  chance: '0',
  actions: [{ ...defaultAction }],
};

export default generateModule({
  namespaced: true,

  state: { ...rarityActiveConfig },

  stateLink: 'rarity_',

  actions: {

    deleteAction({ dispatch, rootGetters, state }) {
      const currentIndex = rootGetters['actions/actionIndex'];

      dispatch('actions', state.actions.filter((_, index) => index !== currentIndex));
      dispatch('actions/actionIndex', undefined, { root: true });
    },

    addNewAction({ dispatch, state }) {
      dispatch('actions', [...state.actions, { ...defaultAction }]);
      dispatch('actions/actionIndex', state.actions.length - 1, { root: true });
    },

  },

});

export { rarityActiveConfig, rarityInactiveConfig };
