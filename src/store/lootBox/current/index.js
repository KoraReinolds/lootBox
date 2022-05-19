import generateModule from '@/store/moduleGenerator';
import { defaultSteps } from '@/store/steps';

const defaultLootBox = {
  ...defaultSteps,
};

export default generateModule({
  namespaced: true,

  state: { ...defaultLootBox },

});

export { defaultLootBox };
