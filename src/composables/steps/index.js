import { useStore } from 'vuex';
import { computed } from 'vue';

export default () => {
  const store = useStore();

  const steps = computed(() => store.getters['lootBox/current/activeSteps']);

  const currentStep = computed(() => store.getters['steps/current_']);

  const changeStep = (step) => store.dispatch('steps/currentStep', step);

  const changeChance = (chance) => store.dispatch('rarity/chance', chance);

  return {
    steps,
    changeStep,
    currentStep,
    changeChance,
  };
};
