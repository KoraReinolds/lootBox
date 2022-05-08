import generateModule from '@/store/moduleGenerator';

const defaultLootBox = {
  name: '',
  bitsCost: '',
};

export default generateModule({
  namespaced: true,

  state: { ...defaultLootBox },

});

export { defaultLootBox };
