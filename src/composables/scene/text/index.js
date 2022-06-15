import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { animationFunctions } from '@/composables/scene/animation';
import config from '@/composables/scene/config';
import getTesselatedMesh from './shaders';

const { textHeight, textParams } = config;

export default ({ group, textMeshes }) => {
  const createTextAndAddToScene = (lineText, index) => {
    const textGeo = new TextGeometry(lineText, textParams);

    textGeo.computeBoundingBox();

    if (textGeo.boundingBox) textGeo.center();

    const mesh = getTesselatedMesh(textGeo);

    const meshWrapper = new THREE.Group();
    animationFunctions.positionChange({
      value: -textHeight * index,
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
      value: (textHeight / 2) * (lines.length - 1) - 100,
      mesh: group,
      axis: ['y'],
    });
  };

  return {
    generatieTextMeshes,
  };
};
