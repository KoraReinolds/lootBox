import generateModule from '@/store/moduleGenerator';
import data from './data';

export default generateModule({
  namespaced: true,

  state: {
    lastSavedData: undefined,
    theme: 'light',
  },

  getters: {
    configurationLoaded: (state) => !!state.lastSavedData,
  },

  actions: {

    setConfig({ dispatch, commit, rootGetters }, configString) {
      try {
        const config = JSON.parse(configString);

        if (Object.keys(config).length) {
          commit('data', config);
          commit('lastSavedData', config);
        }

        dispatch('lootBox/lootBoxIndex', 0, { root: true });

        const avalableSteps = rootGetters['lootBox/current/availableSteps'];

        dispatch('steps/currentStep', avalableSteps[0], { root: true });
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
