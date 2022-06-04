<template>
  <div
    class="widget"
    ref="widget"
  >
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
} from 'vue';
import useText from '@/composables/text';
import useScene from '@/composables/scene';

const widget = ref(document.createElement('div'));
const { scene, initScene } = useScene();
const { textMeshes } = useText(scene);
const start = new Date();

const animation = () => {
  const textMesh = textMeshes.firstLine;

  if (textMesh) {
    const now = new Date() - start;

    const value = Math.sin(now / 500);
    const scale = 1 + value / 100;

    textMesh.position.y = value * 5 - 100;
    textMesh.scale.set(scale, scale, scale);
  }
};

onMounted(() => {
  initScene({ widget, animation });
});

</script>

<style lang="scss">

</style>
