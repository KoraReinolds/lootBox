<template>
  <div class="config">
    <Stepper />
    <div class="widget">
      <Widget class="canvas" />
      <InputRange
        :list="bitsCost"
        :modelValue="currentCost"
        @update:modelValue="changeCost"
      />
      <span>{{currentCost}}</span>
    </div>
    <ActionList />
  </div>
</template>

<script setup>
import Stepper from '@/components/Stepper.vue';
import ActionList from '@/components/ActionList.vue';
import Widget from '@/components/Widget.vue';
import InputRange from '@/components/InputRange.vue';
import useProducts from '@/composables/products';

const { bitsCost, changeCost, currentCost } = useProducts();

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
