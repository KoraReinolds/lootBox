<template>
  <!-- <div
    :style="{
      width: `${size || width}px`,
      height: `${size || height}px`,
    }"
    :class="['icon', { filled }]"
    v-html="svgHTML"
  /> -->
  <div>123</div>
  <!-- <component
    :is="dynamicComponent"
    :style="{
      width: width && `${width}px`,
      height: height && `${height}px`,
    }"
    :class="{
      filled,
      [`qa-icon-${name}`]: true,
    }"
    class="icon"
  /> -->
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  size: {
    type: Number,
    default: undefined,
  },
  name: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    default: undefined,
  },
  height: {
    type: Number,
    default: undefined,
  },
  filled: {
    type: Boolean,
    default: false,
  },
});

console.log(props, computed);

// eslint-disable-next-line
// const svgHTML = computed(() => import (`@/assets/svg/${props.name}.svg`));

const dynamicComponent = computed(() => {
  const name = props.name; // needed for component update on `name` change
  return () => import(
    // eslint-disable-next-line prefer-template
    `@/assets/svg/${name}.svg`
  );
})
</script>

<style lang="stylus" scoped>
.icon
  display: inline-block
  flex-shrink: 0
  flex-grow: 0
  outline: none
  user-select: none

.filled
  svg, path
    fill: currentColor
</style>
