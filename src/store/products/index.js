import generateModule from '@/store/moduleGenerator';

const lootBoxesState = {
  list: [
    {
      cost: { amount: '100', type: 'bits' },
      displayName: 'Small Gift',
      sku: 'newSKU',
      inDevelopment: true,
    },
    {
      cost: { amount: '1', type: 'bits' },
      displayName: 'Very Small Gift',
      sku: 'newSKU_2',
      inDevelopment: true,
    },
  ],
};

export default generateModule({
  namespaced: true,

  getters: {
    bitsCost: (state) => state.list
      .map((g) => g.cost.amount)
      .sort((a, b) => (+a < +b ? -1 : 1)),
  },

  state: { ...lootBoxesState },

});

export { lootBoxesState };
