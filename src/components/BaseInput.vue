<template>
  <component
    :is="this.many ? 'textarea' : 'input'"
    :value="modelValue"
    @input="($e) => $emit('update:modelValue', $e.target.value)"
  />
</template>

<script setup>

import { defineProps } from 'vue';

defineProps({
  many: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    required: true,
  },
});

</script>

<style lang="stylus">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button
  -webkit-appearance: none
  margin: 0

input[type=number]
  -moz-appearance: textfield

textarea,
input
  resize: none
  border: none
  border-radius: inherit
  &:focus
    outline: none

textarea
  margin-bottom: -4px

</style>
