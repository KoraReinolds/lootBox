<template>
  <div>
    <h1>panel</h1>
    <div
      v-for="data in activeTypes"
      :key="data.name"
    >
      <h2
        v-text="data.name"
        @click="currentType = data.name"
      />
      <template
        v-if="data.name === currentType"
      >
        <div
          v-for="(action, index) in data.rarityConfig.actions"
          :key="`action-${index}`"
        >
          {{ action.value }}
        </div>
      </template>
    </div>
    <BaseButton
      @click="showLootBox(`Box-${currentCost}`)"
    >
      {{ currentCost }}
    </BaseButton>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import useLootBoxes from '@/composables/lootBoxes';
import useProducts from '@/composables/products';

const { showLootBox, activeTypes } = useLootBoxes();
const { currentCost } = useProducts();
const currentType = ref(activeTypes.value[0].name);

</script>
