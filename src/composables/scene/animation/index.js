import config from '@/composables/scene/config';

const { textHeight, cameraDistance } = config;

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

    type1: ({ group, scene }) => {
      const camera = scene.children[0];

      animationFunctions.positionChange({
        mesh: group,
        axis: ['x', 'y', 'z'],
        value: 0,
      });
      animationFunctions.scaleChange({
        mesh: group,
        value: 0.1,
      });

      animate({
        mesh: camera,
        positionChange: {
          params: { axis: ['z'] },
          0: cameraDistance,
          2000: 30,
        },
      });
    },

    type2: ({ scene, group, textMeshes }) => {
      const camera = scene.children[0];

      animationFunctions.positionChange({
        mesh: camera,
        value: 200,
        axis: ['z'],
      });

      animationFunctions.positionChange({
        mesh: group,
        value: 0,
        axis: ['x', 'y'],
      });

      animationFunctions.scaleChange({
        mesh: group,
        value: 0.6,
      });

      textMeshes.forEach((wrappedMesh, index) => {
        animationFunctions.positionChange({
          mesh: wrappedMesh.children[0],
          axis: ['z'],
          value: 150,
        });

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

    type3: ({ group, textMeshes }) => {
      animationFunctions.positionChange({
        mesh: group,
        value: 0,
        axis: ['x', 'y'],
      });

      animationFunctions.positionChange({
        mesh: group,
        value: 100,
        axis: ['z'],
      });

      animationFunctions.scaleChange({
        mesh: group,
        value: 0.3,
      });

      textMeshes.forEach((wrappedMesh, index) => {
        const delay = index * 300;

        animate({
          mesh: wrappedMesh,
          positionChange: {
            params: { axis: ['y'], delay },
            0: -textHeight * index - 100,
            2000: -textHeight * index,
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
  };

  const animateMeshes = ({ type, ...params }) => {
    animations[type](params);
  };

  return { animateMeshes };
};
