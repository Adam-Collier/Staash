<template>
    <div class="nav">
      <template v-if="this.$store.state.signedIn">
        <template v-if="this.$route.name == 'home'">
          <router-link to="profile">Profile</router-link>
          <router-link to="/" @click.native="signOut()">Logout</router-link>
        </template>
        <template v-else>
          <router-link to="/">Home</router-link>
          <router-link to="/" @click.native="signOut()">Logout</router-link>
        </template>
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
