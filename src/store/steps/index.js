import generateModule from '@/store/moduleGenerator';
import { rarityConfig } from '@/store/rarity';
import { generalConfig } from '@/store/general';
import { costConfig } from '@/store/cost';
import current, { defaultStep } from './current';

const rarityList = ['none', 'common', 'rare', 'epic', 'legendary'];

const defaultSteps = rarityList.reduce((config, rarity) => ({
  ...config,
  [rarity]: {
    ...defaultStep,
    active: rarity === 'common',
    rarityConfig,
  },
}), {
  general: {
    ...defaultStep,
    generalConfig,
  },
  cost: {
    ...defaultStep,
    costConfig,
  },
});

export default generateModule({
  namespaced: true,

  state: {
    currentStep: undefined,
  },

  actions: {

    currentStep({ commit, rootState }, step) {
      const currentLootBox = rootState.lootBox.current;

      if (!currentLootBox) {
        console.warn("lootBox can't be find");
        return;
      }

      const currentStep = currentLootBox[step];

      if (!rarityList.includes(step) || !currentStep) {
        console.warn("step can't be find");
      }

      if (currentStep.generalConfig) {
        commit('general', currentStep.generalConfig, { root: true });
      }
      if (currentStep.costConfig) {
        commit('cost', currentStep.costConfig, { root: true });
      }
      if (currentStep.rarityConfig) {
        commit('rarity', currentStep.rarityConfig, { root: true });
      }
      commit('currentStep', step);
      commit('current', currentStep);
    },

  },

  modules: {
    current,
  },

});

export { rarityList, defaultSteps };
