import generateModule from '@/store/moduleGenerator';

const defaultStep = {
  active: true,
  finished: false,
  chance: '0',
  actions: [],
};

export default generateModule({
  namespaced: true,

  state: { ...defaultStep },

});

export { defaultStep };
