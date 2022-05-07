import generateModule from '../moduleGenerator';

const defaultConfig = {};

export default generateModule({
  namespaced: true,

  state: {
    data: defaultConfig,
    lastSavedData: defaultConfig,
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

});
