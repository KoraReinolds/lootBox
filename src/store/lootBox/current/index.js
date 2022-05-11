import generateModule from '@/store/moduleGenerator';
import { rarityConfig } from '@/store/steps';

const defaultLootBox = {
  name: '',
  bitsCost: '',
  ...rarityConfig,
};

export default generateModule({
  namespaced: true,

  state: { ...defaultLootBox },

});

export { defaultLootBox };
