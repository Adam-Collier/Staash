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
      <h3>Your Sites</h3>
      <p>
        All of the sites you have added to Staash. Once you delete a site you won't be able to recover it. 
      </p>
      <div class="site" v-for="site in sites" :key="site.id" :data-id="site._id">
        <h4>{{site.siteTitle}}</h4>
        <button @click="deleteSites(site._id)">Delete</button>
      </div>
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
  beforeCreate: function() {
    this.$store.dispatch("getSites");
  },
  computed: {
    sites() {
      let sites = Array.from(this.$store.state.userSites);
      return sites;
    }
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
    deleteSites(id) {
      console.log(id);
      fetch("http://localhost:3001/delete-site", {
        method: "post",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          token: localStorage.getItem("staashToken"),
          type: "user"
        }),
        body: JSON.stringify({ id: id })
      }).then(() => {
        this.$store.dispatch("getSites");
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
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
  margin-bottom: 40px

.sites
  width: 500px
  margin: 0 auto 50px auto
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1)
  padding: 10px 30px 30px 30px
  border-radius: 5px

.site
  display: flex
  flex-direction: row
  align-items: center
  justify-content: space-between
  padding: 5px 0px

  button
    font-size: 14px
    font-weight: 500
</style>
