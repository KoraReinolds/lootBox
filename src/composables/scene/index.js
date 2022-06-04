import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default () => {
  const scene = new THREE.Scene();
  let camera;
  let renderer;

  const initScene = ({ widget, animation }) => {
    if (!widget) {
      console.log('widget ref is required');
      return;
    }

    const { width, height } = widget.value.getBoundingClientRect();
    camera = new THREE.PerspectiveCamera(
      75, width / height, 0.1, 1000,
    );
    camera.position.z = 500;

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.physicallyCorrectLights = true;

    renderer.setSize(width, height);
    widget.value.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    const light = new THREE.AmbientLight(0x404040, 10);
    scene.add(light);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      animation();
    };

    animate();
  };

  return {
    scene,
    renderer,
    camera,
    initScene,
  };
};
