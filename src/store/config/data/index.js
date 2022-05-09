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
    },

  },

});

export { defaultConfigData };
