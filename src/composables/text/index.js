import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { TessellateModifier } from 'three/examples/jsm/modifiers/TessellateModifier';
import fontSMTH from '@/assets/fonts/Ruslan_Display_Regular.typeface.json';
import { animationFunctions } from '@/composables/animation';
import vertexShader from './shaders/vertex';
import fragmentShader from './shaders/fragment';

const LINE_HEIGHT = 80;

const getShaderMaterial = () => new THREE.ShaderMaterial({
  uniforms: {
    amplitude: { value: 0.0 },
    opacity: { value: 1.0 },
  },
  vertexShader,
  fragmentShader,
});

const tesselateGeometry = (geo) => {
  const tessellateModifier = new TessellateModifier(1, 1);

  const geometry = tessellateModifier.modify(geo);

  const numFaces = geometry.attributes.position.count / 3;

  const colors = new Float32Array(numFaces * 3 * 3);
  const displacement = new Float32Array(numFaces * 3 * 3);

  const color = new THREE.Color();

  [...new Array(numFaces).keys()].forEach((f) => {
    const n = 9 * f;

    color.setHSL(1, 1, 1);

    const d = 10 * (0.5 - Math.random());

    [0, 1, 2].forEach((i) => {
      colors[n + (3 * i)] = color.r;
      colors[n + (3 * i) + 1] = color.g;
      colors[n + (3 * i) + 2] = color.b;

      displacement[n + (3 * i)] = d;
      displacement[n + (3 * i) + 1] = d;
      displacement[n + (3 * i) + 2] = d;
    });
  });

  geometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('displacement', new THREE.BufferAttribute(displacement, 3));

  return geometry;
};

export default ({ group, textMeshes }) => {
  const createTextAndAddToScene = (lineText, index) => {
    const textGeo = tesselateGeometry(new TextGeometry(lineText, {
      font: new FontLoader().parse(fontSMTH),
      curveSegments: 4,
      height: 20,
      size: 70,
      bevelThickness: 2,
      bevelSize: 1.5,
    }));

    const shaderMaterial = getShaderMaterial();

    textGeo.computeBoundingBox();

    const mesh = new THREE.Mesh(textGeo, shaderMaterial);

    if (textGeo.boundingBox) {
      textGeo.center();
    }
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
    tesselateGeometry,
    getShaderMaterial,
  };
};
