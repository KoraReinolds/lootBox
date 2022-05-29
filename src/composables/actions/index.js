import { useStore } from 'vuex';
import { computed } from 'vue';

export default () => {
  const store = useStore();

  const currentActions = computed(() => store.getters['rarity/actions']);

  const setActionIndex = (index) => store.dispatch('actions/actionIndex', index);

  const saveActions = () => store.dispatch('rarity/addNewAction');

  const setActionValue = (val) => store.dispatch('actions/current/value', val);

  return {
    currentActions,
    setActionIndex,
    setActionValue,
    saveActions,
  };
};
