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

const linearFunction = ({
  duration, from, to,
}) => {
  if (new Date() - start > duration) start = new Date();

  const delta = new Date() - start;

  return from + (to - from) * (delta / duration);
};

const positionChange = ({ f, mesh, axis }) => {
  // eslint-disable-next-line no-param-reassign
  axis.forEach((dir) => { mesh.position[dir] = f(); });
};

const opacityChange = ({ f, mesh }) => {
  // eslint-disable-next-line no-param-reassign
  mesh.material.forEach((mat) => { mat.opacity = f(); });
};

const animation = () => {
  textMeshes.forEach((mesh, index) => {
    const toPosition = -80 * (index + 1);
    const fromPosition = toPosition - 100;

    positionChange({
      mesh,
      axis: ['y'],
      f: () => linearFunction({
        duration: 2000,
        from: fromPosition,
        to: toPosition,
      }),
    });

    opacityChange({
      mesh,
      f: () => linearFunction({
        duration: 2000,
        from: 0,
        to: 1,
      }),
    });
  });
};

onMounted(() => {
  initScene({ widget, animation });

  const { showText } = useText({ scene, textMeshes });

  watch(currentAction, (value) => showText(value));
});

</script>

<style lang="scss">

</style>
