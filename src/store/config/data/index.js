import generateModule from '@/store/moduleGenerator';
import { defaultLootBox } from '@/store/lootBox/current';

const defaultConfigData = {
  lootBoxes: [{ ...defaultLootBox }],
};

export default generateModule({
  namespaced: true,

  state: defaultConfigData,

  actions: {

    addNewLootBox({ dispatch, commit, state }) {
      commit('lootBoxes', [...state.lootBoxes, { ...defaultLootBox }]);
      dispatch('lootBox/lootBoxIndex', state.lootBoxes.length - 1, { root: true });
    },

  },

});

export { defaultConfigData };
