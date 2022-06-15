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
import * as THREE from 'three';
import getTesselatedMesh from '@/composables/text/shaders';
import modelLoader from '@/composables/scene/modelLoader';

const widget = ref(document.createElement('div'));
const { scene, initScene } = useScene();
const { currentAction } = useActions();
const { animateMeshes } = useAnamation();
const textMeshes = [];
const group = new THREE.Group();

const animation = () => {
  animateMeshes({ group, textMeshes, type: 'type1' });
};

onMounted(() => {
  initScene({ widget, animation });

  const {
    generatieTextMeshes,
  } = useText({ group, textMeshes });

  modelLoader('lootbox.glb').then((gltf) => {
    const { geometry } = gltf.scene.children[2];
    scene.add(getTesselatedMesh(geometry));
  });

  scene.add(group);

  watch(currentAction, (value) => {
    generatieTextMeshes(value);

    animation();
  });
});

</script>

<style lang="scss">

</style>
