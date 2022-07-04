<template>
  <div>
    <h1>panel</h1>
    <BaseButton
      @click="showLootBox(`Box-${currentCost}`)"
    >
      {{ currentCost }}
    </BaseButton>
  </div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue';
import useLootBoxes from '@/composables/lootBoxes';
import useProducts from '@/composables/products';

const { showLootBox } = useLootBoxes();
const { currentCost } = useProducts();

</script>
