<template>
    <div class="nav">
      <template v-if="this.$store.state.signedIn">
          <router-link to="profile" v-if="this.$route.name == 'home'">Profile</router-link>
          <router-link to="/" v-else >Home</router-link>
          <router-link to="/" @click.native="signOut()">Logout</router-link>
      </template>
      <template v-else>
        <a href="http://localhost:3001/login">Login</a>
      </template>
    </div>
</template>

<script>
export default {
  methods: {
    signOut() {
      localStorage.removeItem("staashToken");
      this.$store.commit("signOut");
    }
  }
};
</script>

<style lang="stylus">
.nav
  display: flex
  justify-content: flex-end

  a
    padding-right: 10px
    margin-bottom: 8px
    cursor: pointer
</style>
