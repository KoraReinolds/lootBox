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

  getters: {
    current_: (state, getters, rootState, rootGetters) => rootGetters['lootBox/current_'][state.currentStep],
  },

  modules: {
    current,
  },

});

export { rarityList, defaultSteps };
