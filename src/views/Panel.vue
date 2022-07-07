<template>
  <div>
    <h1>panel</h1>
    <div
      v-for="(data, type) in $store.getters['lootBox/current_']"
      :key="type"
    >
      <div v-if="+data?.rarityConfig?.chance">
        <h2>{{type}}</h2>
        <div
          v-for="(action, index) in data.rarityConfig.actions"
          :key="`action-${index}`"
        >
          {{ action.value }}
        </div>
      </div>
    </div>
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
