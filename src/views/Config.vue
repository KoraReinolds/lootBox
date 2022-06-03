src/composables/steps/index.js<template>
  <div class="config">
    <Stepper />
    <div class="widget">
      <img src="@/assets/lootbox.gif" >
      <Widget class="canvas" />
    </div>
    <ActionList />
  </div>
</template>

<script setup>
import Stepper from '@/components/Stepper.vue';
import ActionList from '@/components/ActionList.vue';
import Widget from '@/components/Widget.vue';

</script>

<style lang="stylus" scoped>
.config
  display: flex

  > div
    width: 25%
    height: 500px

  .widget
    position: relative
    width: 500px

    img
      position: absolute
      top: 0
      left: 0

    .canvas
      width: 100%
      height: 100%

</style>
