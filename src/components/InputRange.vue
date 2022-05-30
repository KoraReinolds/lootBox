<template>
  <div
    v-if="list.length"
  >
    <input
      type='range'
      min='0'
      :max="list.length - 1"
      v-model="listIndex"
      :disabled="disabled"
    >
  </div>
</template>

<script setup>
import {
  defineProps, defineEmits, ref, watch,
} from 'vue';

const props = defineProps({
  list: {
    type: Array,
  },
  modelValue: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
});
const listIndex = ref(props.list.indexOf(props.modelValue));
const emit = defineEmits(['update:modelValue']);

watch(listIndex, (index) => {
  emit('update:modelValue', `${props.list[index]}`);
});
</script>
