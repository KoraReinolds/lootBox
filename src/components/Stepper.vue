<template>
  <div>
    <div
      v-for="step in steps"
      :key="step.name"
      @click="changeStep(step.name)"
    >
      {{ step.name }}
    </div>
  </div>
</template>

<script setup>
import useSteps from '@/composables/steps';

const { steps, changeStep } = useSteps();

</script>
