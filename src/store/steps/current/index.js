import generateModule from '@/store/moduleGenerator';

const defaultInactiveStep = {
  active: false,
};

const defaultActiveStep = {
  active: true,
};

export default generateModule({
  namespaced: true,

  state: { ...defaultActiveStep },

  stateLink: 'steps/current_',

});

export { defaultInactiveStep, defaultActiveStep };
