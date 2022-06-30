import { useStore } from 'vuex';
import { computed } from 'vue';

export default () => {
  const store = useStore();

  const steps = computed(() => store.getters['lootBox/current/activeSteps']);

  const noneStep = computed(() => store.getters['lootBox/current/none']);

  const noneChance = computed(() => noneStep.value.rarityConfig.chance);

  const currentStep = computed(() => store.getters['steps/current_']);

  const changeStep = (step) => store.dispatch('steps/currentStep', step);

  const changeCurrentChance = (chance) => store.dispatch('rarity/chance', chance);

  const callActionOnStep = (step, action) => {
    const lastStepName = currentStep.value.name;

    changeStep(step);
    action();
    changeStep(lastStepName);
  };

  return {
    steps,
    changeStep,
    currentStep,
    changeCurrentChance,
    noneChance,
    callActionOnStep,
  };
};
