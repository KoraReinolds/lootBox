import config from '@/composables/scene/config';

const {
  textHeight,
  cameraDistance,
  textDistance,
  modelXRotation,
  modelYRotation,
} = config;

const animationFunctions = {
  amplitudeChange: ({ value, mesh }) => {
    // eslint-disable-next-line no-param-reassign
    mesh.material.uniforms.amplitude.value = value;
  },
  positionChange: ({ value, mesh, axis = ['x'] }) => {
    // eslint-disable-next-line no-param-reassign
    axis.forEach((dir) => { mesh.position[dir] = value; });
  },
  opacityChange: ({ value, mesh }) => {
    mesh.children.forEach((child) => {
      animationFunctions.opacityChange({
        mesh: child, value,
      });
    });

    if (!mesh.material) return;

    if (mesh.material.type === 'ShaderMaterial') {
      // eslint-disable-next-line no-param-reassign
      mesh.material.uniforms.opacity.value = value;
    } else {
      // eslint-disable-next-line no-param-reassign
      mesh.material.forEach((mat) => { mat.opacity = value; });
    }
  },
  scaleChange: ({ value, mesh }) => {
    mesh.scale.set(value, value, value);
  },
  rotationChange: ({ value, mesh, axis }) => {
    // eslint-disable-next-line no-param-reassign
    axis.forEach((dir) => { mesh.rotation[dir] = value; });
  },
};

export { animationFunctions };

export default () => {
  let start = new Date();

  const resetScene = ({ scene, textMeshes, group }) => {
    const camera = scene.children[0];
    const meshes = [scene, group, ...textMeshes];
    const model = scene.children[2];

    start = new Date();

    animationFunctions.rotationChange({
      mesh: model, value: modelXRotation, axis: ['x'],
    });
    animationFunctions.rotationChange({
      mesh: model, value: modelYRotation, axis: ['y'],
    });

    camera.position.set(0, 0, cameraDistance);

    meshes.forEach((mesh) => {
      animationFunctions.scaleChange({
        mesh, value: 1,
      });
      animationFunctions.positionChange({
        mesh,
        value: 0,
        axis: ['x', 'y', 'z'],
      });
      animationFunctions.opacityChange({
        mesh,
        value: 1,
      });
    });

    textMeshes.forEach((wrappedMesh, index) => {
      [wrappedMesh.children[0], wrappedMesh].forEach((mesh) => {
        animationFunctions.positionChange({
          mesh,
          axis: ['x', 'y', 'z'],
          value: 0,
        });
        animationFunctions.rotationChange({
          mesh,
          axis: ['x', 'y', 'z'],
          value: 0,
        });
        animationFunctions.opacityChange({
          mesh,
          value: 1,
        });
        animationFunctions.scaleChange({
          mesh,
          value: 1,
        });
      });
      animationFunctions.positionChange({
        mesh: wrappedMesh,
        axis: ['y'],
        value: -textHeight * index,
      });
    });
  };

  const animate = ({
    mesh, ...functions
  }) => {
    const timeFromStart = new Date() - start;

    Object.entries(functions).forEach(([functionName, { params = {}, ...animationData }]) => {
      const animationFunction = animationFunctions[functionName];
      const { delay = 0, pow = 1 } = params;
      const gaps = Object.keys(animationData);
      const values = Object.values(animationData);

      if (!animationFunction) {
        console.warn(`can't find animation function with name ${functionName}`);
      }

      if (timeFromStart < delay) {
        animationFunctions.positionChange({
          mesh, value: 9999,
        });
      } else {
        animationFunctions.positionChange({
          mesh, value: 0,
        });
        let currentGapIndex = +gaps.findIndex(
          (time) => +time > timeFromStart - delay,
        );

        if (currentGapIndex === -1) {
          start = new Date();
          currentGapIndex = 1;
        }

        const to = values[currentGapIndex];
        const from = values[currentGapIndex - 1];

        const functionParams = {
          ...params,
          mesh,
          to,
          from,
        };

        const duration = +gaps[currentGapIndex] - +gaps[currentGapIndex - 1];
        const delta = timeFromStart - gaps[currentGapIndex - 1] - delay;
        const ratio = Math.max(0, delta) / duration;
        const value = from + (to - from) * (ratio ** pow);

        animationFunction({
          ...functionParams,
          value,
        });
      }
    });
  };

  const animations = {

    legendary: {
      initScene: (params) => {
        resetScene(params);

        const { group } = params;

        animationFunctions.positionChange({
          mesh: group,
          axis: ['x', 'y', 'z'],
          value: 0,
        });
      },
      moveMeshes: ({ scene, group, textMeshes }) => {
        const model = scene.children[2];

        animate({
          mesh: model,
          rotationChange: {
            params: { axis: ['y'] },
            0: modelYRotation,
            2000: modelYRotation + Math.PI / 6,
            2500: Math.PI,
            6000: Math.PI + Math.PI / 12,
          },
          amplitudeChange: {
            0: 0,
            500: 0.1,
            1000: 3,
            2100: 7,
            3000: 1000,
            4000: 1000,
            6000: 1000,
          },
          scaleChange: {
            0: 1,
            2100: 0.8,
            4000: 0.8,
            6000: 0.8,
          },
        });

        animate({
          mesh: group,
          scaleChange: {
            0: 0.5,
            2100: 1,
            2200: 3,
            4000: 3,
            6000: 3,
          },
          rotationChange: {
            params: { axis: ['y'] },
            0: -Math.PI / 6,
            2200: -Math.PI / 6,
            3000: 0,
            6000: Math.PI / 18,
          },
        });

        textMeshes.forEach((wrappedMesh) => {
          animate({
            mesh: wrappedMesh.children[0],
            amplitudeChange: {
              0: 1000,
              500: 1000,
              1000: 10,
              2100: 7,
              3000: 0.3,
              4000: 0,
              6000: 0,
            },
          });
        });
      },
    },

    epic: {
      initScene: (params) => {
        resetScene(params);

        const { group } = params;

        animationFunctions.positionChange({
          mesh: group,
          axis: ['x', 'y', 'z'],
          value: 0,
        });
        animationFunctions.scaleChange({
          mesh: group,
          value: 0.5,
        });
      },
      moveMeshes: ({ scene }) => {
        const camera = scene.children[0];

        animate({
          mesh: camera,
          positionChange: {
            params: { axis: ['z'], pow: 1 },
            0: cameraDistance,
            500: cameraDistance - 20,
            2000: 30,
            3000: 32,
            5000: 28,
            6000: 30,
          },
        });
      },
    },

    rare: {
      initScene: (params) => {
        const { textMeshes } = params;
        resetScene(params);

        textMeshes.forEach((wrappedMesh) => {
          animationFunctions.positionChange({
            mesh: wrappedMesh.children[0],
            axis: ['z'],
            value: textDistance,
          });
        });
      },
      moveMeshes: ({ textMeshes }) => {
        textMeshes.forEach((wrappedMesh, index) => {
          const delay = index * 200;

          animate({
            mesh: wrappedMesh,
            rotationChange: {
              params: { axis: ['y'], delay },
              0: index % 2 ? -Math.PI : Math.PI,
              1000: (index % 2 ? -Math.PI : Math.PI) / 16,
              2000: (index % 2 ? -Math.PI : Math.PI) / 32,
              6000: (index % 2 ? Math.PI : -Math.PI) / 128,
            },
            opacityChange: {
              params: { delay },
              0: 0,
              1000: 1,
              6000: 1,
            },
          });
        });
      },
    },

    common: {
      initScene: (params) => {
        resetScene(params);

        const { group } = params;

        animationFunctions.positionChange({
          mesh: group,
          value: textDistance,
          axis: ['z'],
        });

        animationFunctions.scaleChange({
          mesh: group,
          value: 1,
        });
      },
      moveMeshes: ({ textMeshes }) => {
        textMeshes.forEach((wrappedMesh, index) => {
          const delay = index * 200;

          animate({
            mesh: wrappedMesh,
            positionChange: {
              params: { axis: ['y'], delay },
              0: -(textHeight / 2) * index - 100,
              1000: -(textHeight) * index - 5,
              4000: -(textHeight) * index - 2,
              6000: -(textHeight) * index,
            },
            scaleChange: {
              params: { delay },
              0: 0,
              1000: 1,
              6000: 1,
            },
          });
        });
      },
    },
  };

  return { animations };
};
