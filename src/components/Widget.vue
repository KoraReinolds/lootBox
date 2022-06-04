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
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import useActions from '@/composables/actions';
import fontSMTH from '../../public/fonts/Ruslan_Display_Regular.typeface.json';

const widget = ref(document.createElement('div'));
const scene = new THREE.Scene();
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

const initScene = () => {
  const { width, height } = widget.value.getBoundingClientRect();
  const camera = new THREE.PerspectiveCamera(
    75, width / height, 0.1, 1000,
  );
  camera.position.z = 500;

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.physicallyCorrectLights = true;

  renderer.setSize(width, height);
  widget.value.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  const light = new THREE.AmbientLight(0x404040, 10);
  scene.add(light);

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    if (textMesh) {
      const now = new Date() - start;

      const value = Math.sin(now / 500);
      const scale = 1 + value / 100;

      textMesh.position.y = value * 5 - 100;
      textMesh.scale.set(scale, scale, scale);
    }
  };

  animate();

  watch(currentAction, (text) => showText(text));
};

onMounted(() => {
  initScene();
});

</script>

<style lang="scss">

</style>
