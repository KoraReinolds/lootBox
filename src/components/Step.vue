<template>
  <div
    @mousedown="changeStep(step.name)"
  >
    <span>({{ chance }})  </span>
    <span>{{ step.name }}</span>
    <InputRange
      :list="list"
      :modelValue="chance"
      @update:modelValue="changeChance"
      :disabled="disabled"
    />
  </div>
</template>

<script setup>
import useSteps from '@/composables/steps';
import InputRange from '@/components/InputRange.vue';
import {
  ref, computed, defineProps, watch,
} from 'vue';

const props = defineProps({
  step: {
    type: Object,
    rerquired: true,
  },
});

const {
  noneChance, changeStep, changeCurrentChance, callActionOnStep,
} = useSteps();
const chance = ref(props.step.rarityConfig.chance);
const maxValue = computed(() => ((+noneChance.value + +chance.value)) + 1);
const list = computed(() => [...Array(maxValue.value).keys()]);
const disabled = computed(() => props.step.name === 'none' || maxValue.value === 1);
const changeChance = (currentChance) => { chance.value = currentChance; };

watch(chance, (curChance, prevChance) => {
  const delta = curChance - prevChance;

  changeCurrentChance(`${curChance}`);
  callActionOnStep(
    'none',
    () => changeCurrentChance(`${+noneChance.value - +delta}`),
  );
});

</script>
