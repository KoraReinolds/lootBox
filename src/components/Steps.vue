<template>
  <div>
    {{ currentStep }}
  </div>
</template>

<script setup>
import useSteps from '@/composables/steps';

const { currentStep } = useSteps();

</script>
