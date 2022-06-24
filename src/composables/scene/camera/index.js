import * as THREE from 'three';
import config from '@/composables/scene/config';

const { cameraDistance } = config;

export default ({ width, height }) => {
  const camera = new THREE.PerspectiveCamera(
    75, width / height, 0.1, 300,
  );
  camera.position.z = cameraDistance;

  return {
    camera,
  };
};
