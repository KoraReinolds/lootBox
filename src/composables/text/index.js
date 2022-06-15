import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import fontSMTH from '@/assets/fonts/Ruslan_Display_Regular.typeface.json';
import { animationFunctions } from '@/composables/animation';
import getTesselatedMesh from './shaders';

const LINE_HEIGHT = 80;

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

    if (textGeo.boundingBox) textGeo.center();

    const mesh = getTesselatedMesh(textGeo);

    const meshWrapper = new THREE.Group();
    animationFunctions.positionChange({
      value: -LINE_HEIGHT * index,
      mesh: meshWrapper,
      axis: ['y'],
    });
    meshWrapper.add(mesh);
    textMeshes.push(meshWrapper);
    group.add(meshWrapper);
  };

  const generatieTextMeshes = (text) => {
    if (text === undefined) return;

    const lines = text
      .match(/.{5,10}? |.*/g)
      .filter((line) => line);

    while (textMeshes.length) {
      const mesh = textMeshes.pop();

      group.remove(mesh);
    }

    lines.forEach(createTextAndAddToScene);

    animationFunctions.positionChange({
      value: (LINE_HEIGHT / 2) * (lines.length - 1) - 100,
      mesh: group,
      axis: ['y'],
    });
  };

  return {
    generatieTextMeshes,
  };
};
