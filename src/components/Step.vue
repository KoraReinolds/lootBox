<template>
  <div
    @mousedown="changeStep(step.name)"
  >
    <span>({{ step.rarityConfig.chance }})  </span>
    <span>{{ step.name }}</span>
    <InputRange
      :list="list"
      :modelValue="chance"
      @update:modelValue="changeChance"
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
  noneChance, changeStep, changeCurrentChance,
} = useSteps();
const chance = ref(props.step.rarityConfig.chance);
const maxValue = computed(() => ((+noneChance.value + +chance.value) || 101) + 1);
const list = computed(() => [...Array(maxValue.value).keys()]);
const changeChance = (currentChance) => { chance.value = currentChance; };
watch(chance, (curChance, prevChance) => {
  const stepName = props.step.name;
  const delta = curChance - prevChance;

  changeCurrentChance(curChance);
  changeStep('none');
  changeCurrentChance(`${+noneChance.value - +delta}`);
  changeStep(stepName);
});

</script>
