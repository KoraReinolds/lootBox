import generateModule from '@/store/moduleGenerator';

const costConfig = {
  bitsCost: '0',
};

export default generateModule({
  namespaced: true,

  state: { ...costConfig },

  stateLink: 'cost_',

});

export { costConfig };
