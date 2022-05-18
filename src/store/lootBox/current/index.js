import generateModule from '@/store/moduleGenerator';
import { defaultSteps } from '@/store/steps';

const defaultLootBox = {
  bitsCost: '',
  ...defaultSteps,
};

export default generateModule({
  namespaced: true,

  state: { ...defaultLootBox },

});

export { defaultLootBox };
