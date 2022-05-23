import generateModule from '@/store/moduleGenerator';
import { defaultSteps } from '@/store/steps';

const defaultLootBox = {
  ...defaultSteps,
};

export default generateModule({
  namespaced: true,

  state: { ...defaultLootBox },

  getters: {

    allSteps: (state) => Object.values(state),

    activeSteps: (state, getters) => getters.allSteps
      .filter((step) => step.active),

  },

  stateLink: 'lootBox/current_',

});

export { defaultLootBox };
