import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import useCamera from './camera';
import useRenderer from './renderer';

export default () => {
  const scene = new THREE.Scene();

  const initScene = ({ widget, animation }) => {
    const { width, height } = widget.value.getBoundingClientRect();

    const { camera } = useCamera({ width, height });
    scene.add(camera);

    const { renderer } = useRenderer({ width, height });

    widget.value.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    const animate = () => {
      animation();
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
  };

  return {
    scene,
    initScene,
  };
};
