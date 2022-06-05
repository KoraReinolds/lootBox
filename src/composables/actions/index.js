import { useStore } from 'vuex';
import { computed } from 'vue';

export default () => {
  const store = useStore();

  const currentActions = computed(() => store.getters['rarity/actions']);

  const currentAction = computed(() => store.getters['actions/current_'].value);

  const setActionIndex = (index) => store.dispatch('actions/actionIndex', index);

  const deleteAction = () => store.dispatch('rarity/deleteAction');

  const saveActions = () => {
    const list = currentActions.value;
    const lastIndex = list.length - 1;

    if (!currentAction.value && lastIndex) deleteAction();

    if (list[lastIndex].value) {
      store.dispatch('rarity/addNewAction');
    }
  };

  const setActionValue = (val) => store.dispatch('actions/current/value', val);

  return {
    currentActions,
    currentAction,

    setActionIndex,
    setActionValue,
    saveActions,
  };
};
