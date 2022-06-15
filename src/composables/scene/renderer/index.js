import * as THREE from 'three';

export default ({ width, height }) => {
  const renderer = new THREE.WebGLRenderer({ alpha: true });

  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.physicallyCorrectLights = true;
  renderer.setSize(width, height);

  return {
    renderer,
  };
};
