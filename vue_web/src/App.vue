<template>
  <div id="app">
    <Menus></Menus>
    <router-view style="position:absolute;left:200px;"></router-view>
  </div>
</template>

<script>
import Menus from '@/views/menu/menu.vue'

export default {
  name: 'App',
  components: {Menus}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  /* margin-top: 60px; */
}
</style>
