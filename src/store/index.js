import { createStore } from 'vuex';
import config from './config';
import lootBox from './lootBox';
import steps, { rarityList } from './steps';
import actions from './actions';

const lootBoxWarning = "lootBox can't be find";
const stepWarning = "step can't be find";
const unknownUtepWarning = "step can't be find";
const actionWarning = "action can't be find";

const myPlugin = (store) => {
  store.subscribe(({ type, payload }) => {
    if (type === 'actions/actionIndex') {
      const currentStep = store.state.steps.current;

      if (!currentStep) {
        console.log(stepWarning);
        return;
      }

      const currentAction = currentStep.actions[payload];

      if (!currentAction) {
        console.log(actionWarning);
        return;
      }

      store.commit('actions/current', currentAction);
    }

    if (type === 'steps/currentStep') {
      if (!rarityList.includes(payload)) {
        console.warn(unknownUtepWarning);
      }

      const currentLootBox = store.state.lootBox.current;

      if (!currentLootBox) {
        console.log(lootBoxWarning);
        return;
      }

      const currentStep = currentLootBox[payload];

      if (!currentStep) {
        console.log(stepWarning);
        return;
      }

      store.commit('steps/current', currentStep);
    }

    if (type === 'lootBox/lootBoxIndex') {
      const currentLootBox = store.getters['config/data/lootBoxes'][payload];

      if (!currentLootBox) {
        console.log(lootBoxWarning);
        return;
      }

      store.commit('lootBox/current', currentLootBox);
    }
  });
};

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    config,
    lootBox,
    steps,
    actions,
  },
  plugins: [myPlugin],
});
