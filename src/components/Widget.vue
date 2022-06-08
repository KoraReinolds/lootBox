<template>
  <div
    class="widget"
    ref="widget"
  >
  </div>
</template>

<script setup>
import {
  ref,
  watch,
  onMounted,
} from 'vue';
import useText from '@/composables/text';
import useScene from '@/composables/scene';
import useActions from '@/composables/actions';

const widget = ref(document.createElement('div'));
const { scene, initScene } = useScene();
const { currentAction } = useActions();
let start = new Date();
const textMeshes = [];

const powFunction = ({
  duration, from, to, pow = 0.3,
}) => {
  if (new Date() - start > duration) start = new Date();

  const delta = new Date() - start;
  const ratio = delta / duration;

  return from + (to - from) * (ratio ** pow);
};

const positionChange = ({ f, mesh, axis }) => {
  // eslint-disable-next-line no-param-reassign
  axis.forEach((dir) => { mesh.position[dir] = f(); });
};

const opacityChange = ({ f, mesh }) => {
  // eslint-disable-next-line no-param-reassign
  mesh.material.forEach((mat) => { mat.opacity = f(); });
};

const scaleChange = ({ f, mesh }) => {
  const value = f();
  // eslint-disable-next-line no-param-reassign
  mesh.scale.set(value, value, value);
};
const rotationChange = ({ f, mesh, axis }) => {
  // eslint-disable-next-line no-param-reassign
  axis.forEach((dir) => { mesh.rotation[dir] = f(); });
};

const animation = () => {
  textMeshes.forEach((mesh, index) => {
    const toPosition = -80 * (index + 1);
    const fromPosition = toPosition - 100;

    rotationChange({
      mesh,
      axis: ['x'],
      f: () => powFunction({
        duration: 2000,
        from: -Math.PI / 2,
        to: 0,
        pow: 0.3,
      }),
    });

    rotationChange({
      mesh,
      axis: ['y'],
      f: () => powFunction({
        duration: 2000,
        from: -Math.PI / 2,
        to: 0,
        pow: 0.3,
      }),
    });

    positionChange({
      mesh,
      axis: ['y'],
      f: () => powFunction({
        duration: 2000,
        from: fromPosition,
        to: toPosition,
      }),
    });

    opacityChange({
      mesh,
      f: () => powFunction({
        duration: 2000,
        from: 0,
        to: 1,
      }),
    });

    scaleChange({
      mesh,
      f: () => powFunction({
        duration: 2000,
        pow: 0.15,
        from: 0,
        to: 1,
      }),
    });
  });
};

onMounted(() => {
  initScene({ widget, animation });

  const { showText } = useText({ scene, textMeshes });

  watch(currentAction, (value) => {
    showText(value);
    animation();
    textMeshes.forEach((mesh) => {
      if (!mesh.parent) scene.add(mesh);
    });
  });
});

</script>

<style lang="scss">

</style>
