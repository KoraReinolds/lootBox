<template>
  <div>
    <Step
      v-for="step in steps"
      :key="step.name"
      :step="step"
    />
  </div>
</template>

<script setup>
import useSteps from '@/composables/steps';
import Step from '@/components/Step.vue';

const { steps } = useSteps();

</script>
