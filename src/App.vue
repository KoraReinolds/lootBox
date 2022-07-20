<template>
  <icon
    src="@/assets/svg/close.svg"
    width="150"
    height="150"
  />
  <router-view/>
</template>

<script setup>
import useTwitch from '@/composables/twitch';
import useProducts from '@/composables/products';

useTwitch();
const { getProducts } = useProducts();

getProducts();

</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
