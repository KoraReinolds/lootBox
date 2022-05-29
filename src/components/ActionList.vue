<template>
  <div
    v-for="(action, index) in currentActions"
    :key="`action-${index}`"
  >
    <BaseInput
      :modelValue="action.value"
      @update:modelValue="setActionValue($event)"
      @focus="setActionIndex(index)"
      @blur="saveActions"
      placeholder="write to add new action"
    />
  </div>
</template>

<script setup>
import useActions from '@/composables/actions';

import BaseInput from '@/components/BaseInput.vue';

const {
  currentActions, setActionIndex, saveActions, setActionValue,
} = useActions();

</script>
