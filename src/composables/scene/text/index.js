import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import config from '@/composables/scene/config';
import getTesselatedMesh from './shaders';

const { textParams } = config;

export default ({ group, textMeshes }) => {
  const createTextAndAddToScene = (lineText) => {
    const textGeo = new TextGeometry(lineText, textParams);

    textGeo.computeBoundingBox();

    if (textGeo.boundingBox) textGeo.center();

    const mesh = getTesselatedMesh({ geometry: textGeo, color: '0x141414', isText: true });

    const meshWrapper = new THREE.Group();
    meshWrapper.add(mesh);
    textMeshes.push(meshWrapper);
    group.add(meshWrapper);
  };

  const generatieTextMeshes = (text) => {
    if (text === undefined) return;

    const lines = text
      .match(/.{4,10}? |.*/g)
      .filter((line) => line);

    while (textMeshes.length) {
      const mesh = textMeshes.pop();

      group.remove(mesh);
    }

    lines.forEach(createTextAndAddToScene);
  };

  return {
    generatieTextMeshes,
  };
};
