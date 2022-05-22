import generateModule from '@/store/moduleGenerator';

const defaultStep = {
  active: true,
  finished: false,
};

export default generateModule({
  namespaced: true,

  state: { ...defaultStep },

  stateLink: 'steps/current_',

});

export { defaultStep };
