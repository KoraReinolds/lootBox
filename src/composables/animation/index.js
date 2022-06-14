const animationFunctions = {
  positionChange: ({ value, mesh, axis }) => {
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
      } else {
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

    type1: ({ textMeshes }) => {
      textMeshes.forEach((wrappedMesh, index) => {
        animationFunctions.positionChange({
          mesh: wrappedMesh.children[0],
          axis: ['z'],
          value: 100,
        });

        const delay = index * 300;

        animate({
          mesh: wrappedMesh,
          rotationChange: {
            params: { axis: ['y'], delay },
            0: index % 2 ? -Math.PI / 4 : Math.PI / 4,
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

    type2: ({ textMeshes }) => {
      textMeshes.forEach((wrappedMesh, index) => {
        const delay = index * 300;

        animate({
          mesh: wrappedMesh,
          positionChange: {
            params: { axis: ['y'], delay },
            0: -80 * index - 100,
            2000: -80 * index,
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
