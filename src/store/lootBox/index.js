import generateModule from '@/store/moduleGenerator';
import current from './current';

export default generateModule({
  namespaced: true,

  state: {
    lootBoxIndex: undefined,
  },

  actions: {

    lootBoxIndex({ commit, rootGetters }, index) {
      const currentLootBox = rootGetters['config/data/lootBoxes'][index];

      if (!currentLootBox) {
        console.warn(`lootBox with index ${index} can't be find`);
        return;
      }

      commit('lootBoxIndex', index);
      commit('current', currentLootBox);
    },

  },

  modules: {
    current,
  },

});
