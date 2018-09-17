<template>
  <div class="home">
    <Menu />
    <Sites v-if="signedIn"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Menu.vue";
import Sites from "@/components/Sites.vue";

export default {
  name: "home",
  components: {
    Menu,
    Sites
  },
  computed: {
    signedIn() {
      return this.$store.state.signedIn;
    }
  }
};
</script>
