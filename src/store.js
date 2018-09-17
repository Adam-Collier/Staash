import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signedIn: false,
    sites: "",
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
    fetchSites(state) {
      let token = localStorage.getItem("staashToken");
      return fetch("http://localhost:3001/api", {
        headers: new Headers({
          token: token
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
    getSites(context) {
      context.commit("fetchSites");
    }
  }
});
