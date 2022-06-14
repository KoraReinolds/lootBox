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
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const widget = ref(document.createElement('div'));
const { scene, initScene } = useScene();
const { currentAction } = useActions();
const { animateMeshes } = useAnamation();
const textMeshes = [];
const group = new THREE.Group();
const loader = new GLTFLoader();

const animation = () => {
  animateMeshes({ group, textMeshes, type: 'type1' });
};

onMounted(() => {
  initScene({ widget, animation });

  const {
    generatieTextMeshes,
    tesselateGeometry,
    getShaderMaterial,
  } = useText({ group, textMeshes });

  loader.load(
    'lootbox.glb',
    (gltf) => {
      console.log();

      const mesh = new THREE.Mesh(
        tesselateGeometry(gltf.scene.children[2].geometry),
        getShaderMaterial(),
      );

      scene.add(mesh);
    },
    (xhr) => {
      console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
    },
    (error) => {
      console.log(error, 'An error happened');
    },
  );

  scene.add(group);

  watch(currentAction, (value) => {
    generatieTextMeshes(value);

    animation();
  });
});

</script>

<style lang="scss">

</style>
