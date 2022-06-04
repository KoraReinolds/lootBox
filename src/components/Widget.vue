<template>
  <div
    class="widget"
    ref="widget"
  >
  </div>
</template>

<script setup>
import {
  watch,
  ref,
  onMounted,
} from 'vue';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import useActions from '@/composables/actions';
import useScene from '@/composables/scene';
import fontSMTH from '../../public/fonts/Ruslan_Display_Regular.typeface.json';

const widget = ref(document.createElement('div'));
const { scene, initScene } = useScene();
let textMesh;
const start = new Date();
const { currentAction } = useActions();
const showText = (text) => {
  if (textMesh) scene.remove(textMesh);

  const textGeo = new TextGeometry(text, {
    font: new FontLoader().parse(fontSMTH),
    curveSegments: 4,
    height: 20,
    size: 70,
    bevelThickness: 2,
    bevelSize: 1.5,
  });

  textGeo.computeBoundingBox();

  textMesh = new THREE.Mesh(textGeo, [
    new THREE.MeshPhongMaterial({ color: 0x000000, flatShading: true }), // front
    new THREE.MeshPhongMaterial({ color: 0xffffff }), // side
  ]);

  if (textGeo.boundingBox) {
    textGeo.center();
    textMesh.position.y = -100;
  }

  scene.add(textMesh);
};

const animation = () => {
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
  watch(currentAction, (text) => showText(text));
});

</script>

<style lang="scss">

</style>
