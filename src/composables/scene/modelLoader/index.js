import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();

export default (modelName) => new Promise((res, rej) => {
  loader.load(
    modelName,
    (gltf) => res(gltf),
    (xhr) => {
      console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
    },
    (error) => {
      console.log(error, 'An error happened');
      rej(error);
    },
  );
});
