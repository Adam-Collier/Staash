<template>
  <div id="app">
    <router-view/>
    <Mobile/>
  </div>
</template>

<script>
import Mobile from "@/components/Mobile.vue";

export default {
  components: {
    Mobile
  }
};
</script>

<style lang="stylus">
@import './styles/typography.styl'

#app
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  padding-top: 30px

#nav
  padding: 30px

  a
    font-weight: bold
    color: #2c3e50

    &.router-link-exact-active
      color: #42b983

@media (max-width: 500px)
  #app
    width: 100vw
    overflow: hidden
</style>
