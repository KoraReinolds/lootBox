<template>
  <div
    :class="['icon-box',
      rounded && 'rounded bg-background flex-row-center-center'
    ]"
    :style="rounded && getStyle(2)"
  >
    <div
      :style="getStyle()"
      class="flex-row-center-center"
      v-html="svgHTML"
    />
  </div>
</template>

<script setup lang="ts">
  import { defineProps, computed } from 'vue'

  const props = defineProps<{
    name: string
    width: number
    height: number
    rounded?: boolean
  }>()

  const svgHTML = computed(() => require(`@/assets/svg/${props.name}.svg`))
  const getStyle = (ratio = 1) => ({
    width: `${props.width * ratio}px`,
    height: `${props.height * ratio}px`,
  })
</script>

<style lang="scss">
.icon-box {
  &.rounded {
    border: 3px solid;
  }
}

svg {
  width: 100%;
  height: 100%;
}
</style>
