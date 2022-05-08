import { createStore } from 'vuex';
import config from './config';
import lootBox from './lootBox';

const myPlugin = (store) => {
  store.subscribe(({ type, payload }) => {
    if (type === 'lootBox/lootBoxIndex') {
      const currentLootBox = store.getters['config/data/lootBoxes'][payload];

      if (!currentLootBox) {
        console.log(`lootBox with index ${payload} can't be find`);
        return;
      }

      store.commit('lootBox/current', currentLootBox);
    }
  });
};

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    config,
    lootBox,
  },
  plugins: [myPlugin],
});
