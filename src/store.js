import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signedIn: false,
    sites: "",
    userSites: "",
    filterBy: "",
    desktop: true
  },
  mutations: {
    signOut(state) {
      state.signedIn = false;
    },
    signIn(state) {
      state.signedIn = true;
    },
    teamSites(state) {
      return fetch("http://localhost:3001/api", {
        headers: new Headers({
          token: localStorage.getItem("staashToken"),
          type: "team"
        })
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          state.sites = data;
        })
        .catch(err => console.log(err));
    },
    userSites(state) {
      return fetch("http://localhost:3001/api", {
        headers: new Headers({
          token: localStorage.getItem("staashToken"),
          type: "user"
        })
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          state.sites = data;
        })
        .catch(err => console.log(err));
    },
    filterSites(state, text) {
      state.filterBy = text;
    },
    switchView(state) {
      state.desktop = !state.desktop;
    }
  },
  actions: {
    getTeamSites(context) {
      context.commit("teamSites");
    },
    getUserSites(context) {
      context.commit("userSites");
    }
  }
});
