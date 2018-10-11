import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signedIn: false,
    teamSites: "",
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
    getSites(state) {
      return fetch("http://localhost:3001/api", {
        headers: new Headers({
          token: localStorage.getItem("staashToken")
        })
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          ({ teamSites: state.teamSites, userSites: state.userSites } = data);
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
    getSites(context) {
      context.commit("getSites");
    }
  }
});
