<template>
  <div id="app">
    <Menus></Menus>
    <router-view style="position:absolute;left:200px;"></router-view>
    <theme></theme>
  </div>
</template>

<script>
import Menus from '@/views/menu/menu.vue'
import theme from '@/views/menu/theme.vue'
import { mapState } from 'vuex'
export default {
  name: 'App',
  components: {Menus, theme},
  computed: {
    ...mapState('user', ['defaultTheme']),
  },
  mounted() {
    import(`@/styles/variables/${this.defaultTheme}Theme.css`).then(() => {
      document.getElementById('app').className = this.defaultTheme;
    })
  }
}
</script>

<style  lang="less">

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
