import { computed } from 'vue';
import { useStore } from 'vuex';

import useTwitch from '@/composables/twitch';

export default () => {
  const store = useStore();

  const { twitch } = useTwitch();

  const getProducts = async () => {
    const products = await twitch.bits.getProducts();

    store.commit('products/list', products);
  };

  getProducts();

  const bitsCost = computed(() => store.getters['products/bitsCost']);

  return { bitsCost };
};
