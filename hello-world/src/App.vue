<template>
  <div id="app">
    <fullPage></fullPage>
  </div>
</template>

<script>
import fullPage from './components/fullPage.vue'

export default {
  name: 'App',
  components: {
    fullPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
