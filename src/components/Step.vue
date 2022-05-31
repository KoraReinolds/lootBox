<template>
  <div
    @click="changeStep(step.name)"
  >
    <span>{{ `(${chance})  ` }}</span>
    <span>{{ step.name }}</span>
    <InputRange
      :list="Array.from(Array(101).keys())"
      v-model="chance"
    />
  </div>
</template>

<script setup>
import useSteps from '@/composables/steps';
import InputRange from '@/components/InputRange.vue';
import { ref, defineProps } from 'vue';

const props = defineProps({
  step: {
    type: Object,
    rerquired: true,
  },
});

const { changeStep } = useSteps();
const chance = ref(props.step.rarityConfig.chance);

</script>
