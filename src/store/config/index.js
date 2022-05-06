const defaultConfig = {};

export default {
  namespaced: true,

  state: {
    data: defaultConfig,
    lastSavedData: defaultConfig,
  },

  getters: {

    data: (state) => state.data,

    lastSavedData: (state) => state.lastSavedData,

  },

  mutations: {

    data: (state, data) => { state.data = data; },

    lastSavedData: (state, lastSavedData) => { state.lastSavedData = lastSavedData; },

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

};
