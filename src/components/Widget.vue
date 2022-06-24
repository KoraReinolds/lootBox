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
import useText from '@/composables/scene/text';
import useScene from '@/composables/scene';
import useActions from '@/composables/actions';
import useSteps from '@/composables/steps';
import useAnamation from '@/composables/scene/animation';
import * as THREE from 'three';
import getTesselatedMesh from '@/composables/scene/text/shaders';
import modelLoader from '@/composables/scene/modelLoader';

const widget = ref(document.createElement('div'));
const { scene, initScene } = useScene();
const { currentAction, setActionIndex } = useActions();
const { animations } = useAnamation();
const textMeshes = [];
const group = new THREE.Group();
const { currentStep, changeStep } = useSteps();

const animation = () => {
  animations[currentStep.value.name].moveMeshes({
    scene, group, textMeshes,
  });
};

onMounted(() => {
  changeStep('common');

  initScene({ widget, animation });

  const { generatieTextMeshes } = useText({ group, textMeshes });

  modelLoader('lootbox.glb').then((gltf) => {
    const { geometry } = gltf.scene.children[2];
    const mesh = getTesselatedMesh({
      geometry, color: '0xf10161', parts: [1, 10],
    });
    scene.add(mesh);
    watch(currentStep, (value) => {
      animations[value.name].initScene({
        scene, group, textMeshes,
      });
    }, { immediate: true });
  });

  scene.add(group);

  watch(currentAction, (value) => {
    generatieTextMeshes(value);

    animation();
  });

  setActionIndex(0);
});

</script>

<style lang="scss">

</style>
