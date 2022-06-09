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

export { animationFunctions };

export default () => {
  let start = new Date();

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

  const animateMeshes = ({ group }) => {
    const defaultParams = {
      mesh: group,
      duration: 2000,
    };

    animate({
      ...defaultParams,
      functionName: 'positionChange',
      axis: ['y'],
      from: -80,
      to: -180,
    });

    animate({
      ...defaultParams,
      functionName: 'scaleChange',
      pow: 0.15,
      from: 0,
      to: 1,
    });

    animate({
      ...defaultParams,
      functionName: 'opacityChange',
      from: 0,
      to: 1,
    });
  };

  return { animateMeshes };
};
