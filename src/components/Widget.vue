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
import useAnamation, { animationFunctions } from '@/composables/scene/animation';
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
  animations[currentStep.value.name]({
    scene, group, textMeshes,
  });
};

onMounted(() => {
  changeStep('common');

  initScene({ widget, animation });

  const { generatieTextMeshes } = useText({ group, textMeshes });

  modelLoader('lootbox.glb').then((gltf) => {
    const { geometry } = gltf.scene.children[2];
    const mesh = getTesselatedMesh({ geometry, color: '0xf10161' });
    animationFunctions.rotationChange({
      mesh, value: Math.PI / 6, axis: ['x'],
    });
    animationFunctions.rotationChange({
      mesh, value: Math.PI / 5, axis: ['y'],
    });
    scene.add(mesh);
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
