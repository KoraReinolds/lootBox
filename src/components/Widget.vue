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
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import fontSMTH from '../../public/fonts/Ruslan_Display_Regular.typeface.json';

const widget = ref(document.createElement('div'));
const scene = new THREE.Scene();

const showText = (text) => {
  const textGeo = new TextGeometry(text, {
    font: new FontLoader().parse(fontSMTH),
    curveSegments: 4,
    height: 20,
    size: 70,
    bevelThickness: 2,
    bevelSize: 1.5,
  });

  textGeo.computeBoundingBox();

  const textMesh = new THREE.Mesh(textGeo, [
    new THREE.MeshPhongMaterial({ color: 0x000000, flatShading: true }), // front
    new THREE.MeshPhongMaterial({ color: 0xffffff }), // side
  ]);

  if (textGeo.boundingBox) {
    const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
    textMesh.position.x = centerOffset;
    textMesh.position.y = -100;
    textMesh.position.z = 0;
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
  };

  animate();

  showText('Какой-то\nтекст');
};

onMounted(() => {
  initScene();
});

</script>

<style lang="scss">

</style>
