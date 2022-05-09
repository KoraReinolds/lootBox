import generateModule from '@/store/moduleGenerator';
import data, { defaultConfigData } from './data';

export default generateModule({
  namespaced: true,

  state: {
    lastSavedData: defaultConfigData,
  },

  actions: {

    setConfig({ commit }, configString) {
      try {
        const config = JSON.parse(configString);

        commit('data', config);
        commit('lastSavedData', config);
      } catch {
        // TODO: make ui
        console.warn('error during parsing config');
      }
    },

  },

  modules: {
    data,
  },

});
