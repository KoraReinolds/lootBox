<template>
  <div>
    <Stepper />
    <div>{{ currentStep }}</div>
  </div>
</template>

<script setup>
import Stepper from '@/components/Stepper.vue';

import useSteps from '@/composables/steps';

const { currentStep } = useSteps();

</script>
