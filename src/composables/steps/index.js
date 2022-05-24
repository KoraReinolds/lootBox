import { useStore } from 'vuex';
import { computed } from 'vue';

export default () => {
  const store = useStore();

  const steps = computed(() => store.getters['lootBox/current/activeSteps']);

  const currentStep = computed(() => store.getters['steps/current_']);

  const changeStep = (params) => store.dispatch('steps/currentStep', params);

  return {
    steps,
    changeStep,
    currentStep,
  };
};
