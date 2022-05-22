import generateModule from '@/store/moduleGenerator';
import current from './current';

export default generateModule({
  namespaced: true,

  state: {
    actionIndex: undefined,
  },

  getters: {
    current_: (state, getters, rootState, rootGetters) => {
      // eslint-disable-next-line dot-notation
      const { actions } = rootGetters['rarity_'];

      return actions?.[state.actionIndex] || {};
    },
  },

  actions: {

    actionIndex({ commit, rootState }, index) {
      const currentStep = rootState.steps.current;

      if (!currentStep) {
        console.warn("step can't be find");
        return;
      }

      const currentAction = currentStep.actions[index];

      if (!currentAction) {
        console.warn(`action with index ${index} can't be find`);
        return;
      }

      commit('actions/actionIndex', index);
      commit('actions/current', currentAction);
    },

  },

  modules: {
    current,
  },

});
