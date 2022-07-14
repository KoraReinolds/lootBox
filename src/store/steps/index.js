import generateModule from '@/store/moduleGenerator';
import { rarityActiveConfig, rarityInactiveConfig } from '@/store/rarity';
import { generalConfig } from '@/store/general';
import { costConfig } from '@/store/cost';
import current, { defaultInactiveStep, defaultActiveStep } from './current';

const rarityList = ['none', 'common', 'rare', 'epic', 'legendary'];

const defaultActiveFields = ['none', 'common', 'rare', 'epic', 'legendary'];

const defaultField = rarityList[1];

const defaultSteps = rarityList.reduce((config, rarity) => ({
  ...config,
  [rarity]: {
    ...defaultInactiveStep,
    rarityConfig: rarityInactiveConfig,
  },
}), {});

defaultSteps.general = {
  ...defaultInactiveStep,
  generalConfig,
};

defaultSteps.cost = {
  ...defaultInactiveStep,
  costConfig,
};

defaultActiveFields.forEach((field) => {
  defaultSteps[field] = {
    ...defaultSteps[field],
    ...defaultActiveStep,
  };
});

defaultSteps[defaultField].rarityConfig = rarityActiveConfig;
defaultSteps.epic.rarityConfig = rarityActiveConfig;

export default generateModule({
  namespaced: true,

  state: {
    currentStep: 'common',
  },

  getters: {
    current_: (state, getters, rootState, rootGetters) => rootGetters['lootBox/current_'][state.currentStep],
  },

  modules: {
    current,
  },

});

export { rarityList, defaultSteps };
