<template>
  <div
    @mousedown="changeStep(step.name)"
  >
    <span>{{ `(${chance})  ` }}</span>
    <span>{{ step.name }}</span>
    <InputRange
      :list="Array.from(Array(101).keys())"
      :modelValue="chance"
      @update:modelValue="changeChance"
    />
  </div>
</template>

<script setup>
import useSteps from '@/composables/steps';
import InputRange from '@/components/InputRange.vue';
import { computed, defineProps } from 'vue';

const props = defineProps({
  step: {
    type: Object,
    rerquired: true,
  },
});

const { changeStep, changeChance } = useSteps();
const chance = computed(() => props.step.rarityConfig.chance);

</script>
