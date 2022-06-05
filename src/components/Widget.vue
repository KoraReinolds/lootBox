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
  watch,
  onMounted,
} from 'vue';
import useText from '@/composables/text';
import useScene from '@/composables/scene';
import useActions from '@/composables/actions';

const widget = ref(document.createElement('div'));
const { scene, initScene } = useScene();
const { currentAction } = useActions();
const start = new Date();
const textMeshes = [];

const animation = () => {
  textMeshes.forEach((textMesh) => {
    const now = new Date() - start;

    const value = Math.sin(now / 500);
    const scale = textMesh.scale.x + value * 0.001;

    // eslint-disable-next-line no-param-reassign
    textMesh.position.y += value * 0.1;
    textMesh.scale.set(scale, scale, scale);
  });
};

onMounted(() => {
  initScene({ widget, animation });

  const { showText } = useText({ scene, textMeshes });

  watch(currentAction, (value) => showText(value));
});

</script>

<style lang="scss">

</style>
