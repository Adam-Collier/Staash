<template>
    <div class="nav">
      <template v-if="this.$store.state.signedIn">
        <a href="profile">Profile</a>
        <a @click.prevent="signOut()">Logout</a>
      </template>
      <template v-else>
        <a href="profile">Profile</a>
        <a href="http://localhost:3001/login">Login</a>
      </template>
    </div>
</template>

<script>
export default {
  methods: {
    signOut() {
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
