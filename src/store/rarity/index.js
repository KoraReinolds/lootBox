import generateModule from '@/store/moduleGenerator';

const rarityConfig = {
  chance: '0',
  actions: [],
};

export default generateModule({
  namespaced: true,

  state: { ...rarityConfig },

});

export { rarityConfig };
