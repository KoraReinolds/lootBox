import generateModule from '@/store/moduleGenerator';
import { rarityConfig } from '@/store/rarity';
import current, { defaultStep } from './current';

const rarityList = ['none', 'common', 'rare', 'epic', 'legendary'];

const defaultSteps = rarityList.reduce((config, rarity) => ({
  ...config,
  [rarity]: {
    ...defaultStep,
    active: rarity === 'common',
    rarityConfig,
  },
}), {});

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
