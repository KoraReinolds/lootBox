src/composables/steps/index.js<template>
  <div class="config">
    <Stepper />
    <Widget class="widget" />
    <ActionList />
  </div>
</template>

<script setup>
import Stepper from '@/components/Stepper.vue';
import ActionList from '@/components/ActionList.vue';
import Widget from '@/components/Widget.vue';

</script>

<style lang="stylus">
.config
  display: flex

  > div
    width: 25%
    height: 500px

  .widget
    width: 50%

</style>
