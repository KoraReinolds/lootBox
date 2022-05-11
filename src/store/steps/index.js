import generateModule from '@/store/moduleGenerator';
import current, { defaultStep } from './current';

const rarityList = ['none', 'common', 'rare', 'epic', 'legendary'];

const rarityConfig = rarityList.reduce((config, rarity) => ({
  ...config,
  [rarity]: { ...defaultStep },
}), {});

export default generateModule({
  namespaced: true,

  state: {
    currentStep: undefined,
  },

  modules: {
    current,
  },

});

export { rarityList, rarityConfig };
