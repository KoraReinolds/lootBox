import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import fontSMTH from '@/assets/fonts/Ruslan_Display_Regular.typeface.json';

export default ({ scene, textMeshes }) => {
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

    textMeshes.forEach((mesh) => {
      console.log(mesh);
      scene.remove(mesh);
    });

    textMeshes.pop();

    const index = textMeshes.push(new THREE.Mesh(textGeo, [
      new THREE.MeshPhongMaterial({ color: 0x000000, flatShading: true }), // front
      new THREE.MeshPhongMaterial({ color: 0xffffff }), // side
    ])) - 1;

    if (textGeo.boundingBox) {
      textGeo.center();
      // eslint-disable-next-line no-param-reassign
      textMeshes[index].position.y = -100;
    }

    scene.add(textMeshes[index]);
  };

  return {
    showText,
  };
};
