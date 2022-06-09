import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import fontSMTH from '@/assets/fonts/Ruslan_Display_Regular.typeface.json';
import { animationFunctions } from '@/composables/animation';

export default ({ group, textMeshes }) => {
  const createTextAndAddToScene = (lineText, index) => {
    const textGeo = new TextGeometry(lineText, {
      font: new FontLoader().parse(fontSMTH),
      curveSegments: 4,
      height: 20,
      size: 70,
      bevelThickness: 2,
      bevelSize: 1.5,
    });

    textGeo.computeBoundingBox();

    textMeshes.push(new THREE.Mesh(textGeo, [
      new THREE.MeshPhongMaterial({
        transparent: true,
        color: 0x000000,
        flatShading: true,
      }), // front
      new THREE.MeshPhongMaterial({
        transparent: true,
        color: 0xffffff,
      }), // side
    ]));

    if (textGeo.boundingBox) {
      textGeo.center();
    }
    animationFunctions.positionChange({
      value: -80 * index,
      mesh: textMeshes[index],
      axis: ['y'],
    });
    group.add(textMeshes[index]);
  };

  const showText = (text) => {
    if (text === undefined) return;

    const lines = text
      .match(/.{5,10}? |.*/g)
      .filter((line) => line);

    while (textMeshes.length) {
      const mesh = textMeshes.pop();
      group.remove(mesh);
    }

    lines.forEach(createTextAndAddToScene);
  };

  return {
    showText,
  };
};
