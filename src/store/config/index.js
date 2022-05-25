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

        commit('data', config);
        commit('lastSavedData', config);
        dispatch('lootBox/lootBoxIndex', 0, { root: true });
        dispatch(
          'steps/currentStep',
          rootGetters['lootBox/current/activeSteps'][0]?.name,
          { root: true },
        );
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
