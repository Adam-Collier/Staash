import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signedIn: true
  },
  mutations: {
    signOut(state) {
      state.signedIn = false;
    }
  },
  actions: {}
});
