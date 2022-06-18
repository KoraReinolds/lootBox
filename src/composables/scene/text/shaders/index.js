import { TessellateModifier } from 'three/examples/jsm/modifiers/TessellateModifier';
import * as THREE from 'three';
import vertexShader from './vertex';
import fragmentShader from './fragment';

const getShaderMaterial = ({ color, isText } = {}) => new THREE.ShaderMaterial({
  uniforms: {
    isText: { value: isText ? 1.0 : 0.0 },
    amplitude: { value: 0.0 },
    opacity: { value: 1.0 },
    uColor: { value: new THREE.Color(+color || 0x000000) },
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

export default ({ geometry, ...params }) => new THREE.Mesh(
  tesselateGeometry(geometry),
  getShaderMaterial(params),
);
