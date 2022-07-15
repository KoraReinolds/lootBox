import { computed } from 'vue';
import { useStore } from 'vuex';
import useTwitch from '@/composables/twitch';
import api from '@/composables/api';

export default () => {
  const store = useStore();
  const { twitch } = useTwitch();

  const lootBox = computed(() => Object.values(store.getters['lootBox/current_']));

  const activeTypes = computed(() => lootBox.value
    .filter((data) => +data.rarityConfig?.chance));

  const showLootBox = async (sku) => {
    try {
      const { status } = (await api.axiosBackend.post('/createOrder')).data;
      if (status !== 'ok') throw new Error();

      twitch.bits.useBits(sku);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    lootBox,
    showLootBox,
    activeTypes,
  };
};
