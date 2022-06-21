import config from '@/composables/scene/config';

const {
  textHeight, cameraDistance, textDistance,
} = config;

const animationFunctions = {
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

    start = new Date();
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

  const powFunction = ({
    duration, from, to, pow = 0.3, delay = 0,
  }) => {
    const delta = new Date() - start - delay;
    const ratio = delta / duration;

    return from + (to - from) * (ratio ** pow);
  };

  const animate = ({
    mesh, ...functions
  }) => {
    const timeFromStart = new Date() - start;

    Object.entries(functions).forEach(([functionName, { params = {}, ...animationData }]) => {
      const animationFunction = animationFunctions[functionName];
      const { delay = 0 } = params;
      const gaps = Object.keys(animationData);
      const values = Object.values(animationData);

      if (!animationFunction) {
        console.warn(`can't find animation function with name ${functionName}`);
      }

      if (timeFromStart < delay) {
        animationFunctions.opacityChange({
          mesh, value: 0,
        });
        animationFunctions.positionChange({
          mesh, value: 9999,
        });
      } else {
        animationFunctions.positionChange({
          mesh, value: 0,
        });
        let currentGapIndex = +gaps.findIndex(
          (time) => +time > timeFromStart,
        );

        if (currentGapIndex === -1) {
          start = new Date();
          currentGapIndex = 1;
        }

        const to = values[currentGapIndex];
        const from = values[currentGapIndex - 1];
        const duration = +gaps[currentGapIndex] - +gaps[currentGapIndex - 1];

        const functionParams = {
          ...params,
          mesh,
          to,
          from,
          duration,
        };
        animationFunction({
          ...functionParams,
          value: powFunction(functionParams),
        });
      }
    });
  };

  const animations = {

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
            2000: 30,
            4000: 30,
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
          const delay = index * 300;

          animate({
            mesh: wrappedMesh,
            rotationChange: {
              params: { axis: ['y'], delay },
              0: index % 2 ? -Math.PI : Math.PI,
              2000: 0,
            },
            opacityChange: {
              params: { delay },
              0: 0,
              2000: 1,
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
          const delay = index * 300;

          animate({
            mesh: wrappedMesh,
            positionChange: {
              params: { axis: ['y'], delay },
              0: -(textHeight / 2) * index - 100,
              2000: -(textHeight / 2) * index,
            },
            scaleChange: {
              params: { pow: 0.15, delay },
              0: 0,
              2000: 1,
            },
            opacityChange: {
              params: { delay },
              0: 0,
              2000: 1,
            },
          });
        });
      },
    },
  };

  return { animations };
};
