export default () => {
  let start = new Date();

  const animationFunctions = {
    positionChange: ({ value, mesh, axis }) => {
      // eslint-disable-next-line no-param-reassign
      axis.forEach((dir) => { mesh.position[dir] = value; });
    },
    opacityChange: ({ value, mesh }) => {
      // eslint-disable-next-line no-param-reassign
      mesh.material.forEach((mat) => { mat.opacity = value; });
    },
    scaleChange: ({ value, mesh }) => {
      mesh.scale.set(value, value, value);
    },
    rotationChange: ({ value, mesh, axis }) => {
      // eslint-disable-next-line no-param-reassign
      axis.forEach((dir) => { mesh.rotation[dir] = value; });
    },
  };

  const powFunction = ({
    duration, from, to, pow = 0.3,
  }) => {
    if (new Date() - start > duration) start = new Date();

    const delta = new Date() - start;
    const ratio = delta / duration;

    return from + (to - from) * (ratio ** pow);
  };

  const animate = ({
    functionName, ...params
  }) => {
    const animationFunction = animationFunctions[functionName];

    if (!animationFunction) return;

    animationFunction({
      ...params,
      value: powFunction(params),
    });
  };

  const animateMeshes = (textMeshes) => {
    textMeshes.forEach((mesh, index) => {
      const toPosition = -80 * (index + 1);
      const fromPosition = toPosition - 100;

      const defaultParams = {
        mesh,
        duration: 2000,
      };

      animate({
        ...defaultParams,
        functionName: 'rotationChange',
        axis: ['x', 'y'],
        from: -Math.PI / 2,
        to: 0,
        pow: 0.3,
      });

      animate({
        ...defaultParams,
        functionName: 'positionChange',
        axis: ['y'],
        from: fromPosition,
        to: toPosition,
      });

      animate({
        ...defaultParams,
        functionName: 'opacityChange',
        from: 0,
        to: 1,
      });

      animate({
        ...defaultParams,
        functionName: 'scaleChange',
        pow: 0.15,
        from: 0,
        to: 1,
      });
    });
  };

  return { animateMeshes };
};
