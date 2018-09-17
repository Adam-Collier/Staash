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
  },
  beforeMount: function() {
    if (window.location.search) {
      let searchParams = new URLSearchParams(window.location.search.slice(1));
      let token = searchParams.get("token");
      localStorage.setItem("staashToken", token);
    }
    if (localStorage.getItem("staashToken")) {
      this.$store.commit("signIn");
    }
  }
};
</script>

<style lang="stylus">
@import './styles/typography.styl'

#app
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  padding-top: 15px

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
