<template>
  <div>
    <Menu />
    <div class="account">
      <h3>Delete Account</h3>
      <p>
        You can delete your account, but keep in mind this action is
        irreversible.
      </p>
      <button @click="deleteAccount">
        Delete my account
      </button>
    </div>
    <div class="sites">

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Menu.vue";

export default {
  name: "profile",
  components: {
    Menu
  },
  methods: {
    deleteAccount() {
      fetch("http://localhost:3001/delete-user", {
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          token: localStorage.getItem("staashToken")
        })
      })
        .then(response => {
          return response.status;
        })
        .then(status => {
          if (status === 200) {
            this.$store.commit("signOut");
            this.$router.push("/");
          }
        })
        .catch(err => console.log(err));
    },
    deleteSites() {
      fetch("http://localhost:3001/delete-user", {
        method: "post",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          token: localStorage.getItem("staashToken")
        }),
        // get id from data attribute
        body: JSON.stringify()
      });
    }
  }
};
</script>

<style lang="stylus">
button
  padding: 10px 20px
  background: #cb2431
  color: #ffffff
  font-size: 1em
  border: none
  border-radius: 3px
  cursor: pointer

.account
  margin: 0 auto
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1)
  width: 500px
  padding: 10px 30px 40px 30px
  margin-top: 50px
  border-radius: 5px
</style>
