import { computed } from 'vue';
import { useStore } from 'vuex';
import useTwitch from '@/composables/twitch';

export default () => {
  const store = useStore();
  const { twitch } = useTwitch();

  const lootBox = computed(() => store.getters['lootBox/current_']);

  const showLootBox = (sku) => twitch?.bits.useBits(sku);

  return {
    lootBox,
    showLootBox,
  };
};
