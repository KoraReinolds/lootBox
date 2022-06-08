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
import useAnamation from '@/composables/animation';

const widget = ref(document.createElement('div'));
const { scene, initScene } = useScene();
const { currentAction } = useActions();
const { animateMeshes } = useAnamation();
const textMeshes = [];

const animation = () => {
  animateMeshes(textMeshes);
};

onMounted(() => {
  initScene({ widget, animation });

  const { showText } = useText({ scene, textMeshes });

  watch(currentAction, (value) => {
    showText(value);
    animation();
    textMeshes.forEach((mesh) => {
      if (!mesh.parent) scene.add(mesh);
    });
  });
});

</script>

<style lang="scss">

</style>
