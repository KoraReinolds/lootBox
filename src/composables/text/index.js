import {
  watch,
  onMounted,
} from 'vue';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import useActions from '@/composables/actions';
import fontSMTH from '@/assets/fonts/Ruslan_Display_Regular.typeface.json';

export default (scene) => {
  const textMeshes = {};
  const { currentAction } = useActions();
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

    if (textMeshes.firstLine) scene.remove(textMeshes.firstLine);

    textMeshes.firstLine = new THREE.Mesh(textGeo, [
      new THREE.MeshPhongMaterial({ color: 0x000000, flatShading: true }), // front
      new THREE.MeshPhongMaterial({ color: 0xffffff }), // side
    ]);

    if (textGeo.boundingBox) {
      textGeo.center();
      textMeshes.firstLine.position.y = -100;
    }

    scene.add(textMeshes.firstLine);
  };

  onMounted(() => {
    watch(currentAction, (text) => showText(text));
  });

  return {
    textMeshes,
  };
};
