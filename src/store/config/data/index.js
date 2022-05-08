import generateModule from '@/store/moduleGenerator';
import { defaultLootBox } from '@/store/lootBox/current';

const defaultConfigData = {
  lootBoxes: [],
};

export default generateModule({
  namespaced: true,

  state: defaultConfigData,

  actions: {

    addNewLootBox({ commit, state }) {
      commit('lootBoxes', [...state.lootBoxes, { ...defaultLootBox }]);
      commit('lootBox/lootBoxIndex', state.lootBoxes.length - 1, { root: true });
    },

  },

});

export { defaultConfigData };
