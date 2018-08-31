<template>
    <div class="header">
        <Links />
        <div class="navbar">
            <SubmitSite v-if="signedIn"/>
            <svg class="logo" viewBox="0 0 137 31" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><path d="M8.07,6.616c-0.566,0.493 -0.872,1.223 -0.825,1.972c-0.035,0.766 0.241,1.514 0.765,2.073c0.56,0.552 1.241,0.964 1.99,1.203c0.819,0.282 1.731,0.549 2.737,0.8c1.015,0.258 2.016,0.567 3,0.926c0.955,0.343 1.866,0.795 2.717,1.348c0.85,0.574 1.537,1.359 1.992,2.278c0.536,1.095 0.798,2.303 0.765,3.522c0.004,2.38 -1.07,4.638 -2.918,6.138c-2.155,1.777 -4.897,2.689 -7.687,2.556c-2.748,0.133 -5.461,-0.677 -7.687,-2.294c-1.967,-1.574 -3.056,-4.006 -2.919,-6.522l7.325,0c0.188,2.254 1.342,3.381 3.461,3.381c0.85,0.049 1.687,-0.232 2.334,-0.785c0.557,-0.509 0.866,-1.237 0.845,-1.992c0.027,-0.734 -0.25,-1.448 -0.765,-1.972c-0.567,-0.545 -1.247,-0.957 -1.992,-1.207c-0.819,-0.295 -1.731,-0.57 -2.737,-0.825c-1.017,-0.258 -2.019,-0.574 -3,-0.946c-0.95,-0.354 -1.86,-0.806 -2.717,-1.348c-0.851,-0.561 -1.537,-1.339 -1.989,-2.253c-0.533,-1.081 -0.796,-2.276 -0.765,-3.481c-0.082,-2.452 1.011,-4.801 2.938,-6.319c2.147,-1.645 4.804,-2.486 7.506,-2.375c2.621,-0.124 5.212,0.604 7.386,2.073c1.878,1.382 2.857,3.562 2.938,6.54l-7.486,0c-0.044,-0.875 -0.391,-1.707 -0.982,-2.354c-0.56,-0.554 -1.325,-0.853 -2.113,-0.825c-0.765,-0.031 -1.517,0.213 -2.117,0.688l0,0Z" style="fill:#fff;fill-rule:nonzero;"/><path d="M36.183,23.312l2.455,0l0,5.836l-3.5,0c-2.085,0.131 -4.154,-0.459 -5.856,-1.67c-1.381,-1.111 -2.071,-3.022 -2.071,-5.733l0,-9.338l-2.1,0l0,-5.715l2.1,0l0,-5.474l6.882,0l0,5.474l4.508,0l0,5.715l-4.511,0l0,9.338c0,1.045 0.698,1.567 2.093,1.567Z" style="fill:#fff;fill-rule:nonzero;"/><path d="M58.2,18.55c0.098,-1.509 -0.443,-2.993 -1.489,-4.085c-0.899,-0.914 -2.129,-1.429 -3.411,-1.429c-1.292,0 -2.53,0.523 -3.431,1.449c-1.045,1.101 -1.585,2.59 -1.49,4.105c-0.098,1.51 0.443,2.993 1.49,4.085c0.899,0.914 2.129,1.429 3.411,1.429c1.292,0 2.53,-0.523 3.431,-1.449c1.045,-1.101 1.585,-2.59 1.489,-4.105l0,0ZM41.376,18.59c-0.115,-3.038 0.953,-6.004 2.979,-8.271c1.83,-2.089 4.487,-3.274 7.264,-3.24c2.589,-0.129 5.073,1.071 6.581,3.18l0,-2.939l6.885,0l0,22.459l-6.882,0l0,-3.26c-1.463,2.254 -3.994,3.596 -6.681,3.542c-2.742,0.022 -5.36,-1.155 -7.164,-3.22c-2.027,-2.258 -3.097,-5.219 -2.979,-8.251l-0.003,0Z" style="fill:#fff;fill-rule:nonzero;"/><path d="M81.165,18.55c0.093,-1.446 -0.296,-2.883 -1.106,-4.085c-0.537,-0.886 -1.501,-1.429 -2.536,-1.429c-1.045,0 -2.015,0.552 -2.549,1.449c-0.809,1.21 -1.198,2.653 -1.107,4.105c-0.093,1.446 0.296,2.884 1.107,4.085c0.537,0.886 1.501,1.429 2.536,1.429c1.045,0 2.015,-0.552 2.549,-1.449c0.808,-1.21 1.197,-2.653 1.106,-4.105ZM68.665,18.59c-0.121,-2.918 0.652,-5.804 2.214,-8.271c1.475,-2.16 3.275,-3.24 5.4,-3.24c2.113,-0.006 4.039,1.246 4.89,3.18l0,-2.939l5.115,0l0,22.459l-5.115,0l0,-3.26c-1.236,2.361 -2.891,3.542 -4.965,3.542c-2.074,0 -3.849,-1.073 -5.324,-3.22c-1.564,-2.459 -2.337,-5.339 -2.214,-8.251l-0.001,0Z" style="fill:#fff;fill-rule:nonzero;"/><g><path d="M90.795,14.088c-0.006,-1.973 0.939,-3.833 2.536,-4.991c1.99,-1.434 4.413,-2.145 6.862,-2.012c2.48,-0.119 4.932,0.574 6.983,1.972c1.737,1.251 2.782,3.253 2.817,5.393l-7.043,0c0.001,-0.626 -0.296,-1.217 -0.8,-1.59c-0.634,-0.322 -1.343,-0.468 -2.053,-0.423c-1.8,0 -2.7,0.55 -2.7,1.65c0,0.993 1.1,1.677 3.3,2.053c2.087,0.336 4.127,0.917 6.077,1.731c2.053,0.825 3.377,2.86 3.3,5.071c0.02,2.054 -0.996,3.985 -2.7,5.132c-1.989,1.386 -4.377,2.086 -6.8,1.992c-2.418,0.089 -4.806,-0.564 -6.842,-1.872c-1.828,-1.253 -2.939,-3.318 -2.978,-5.534l7.043,0c0.188,1.369 1.155,2.053 2.9,2.053c0.707,0.029 1.405,-0.169 1.992,-0.563c0.491,-0.317 0.788,-0.864 0.785,-1.449c0,-0.59 -0.436,-1.06 -1.308,-1.409c-1.024,-0.392 -2.082,-0.688 -3.16,-0.885c-1.234,-0.241 -2.475,-0.543 -3.723,-0.906c-1.208,-0.339 -2.306,-0.992 -3.18,-1.892c-0.891,-0.95 -1.363,-2.22 -1.308,-3.521l0,0Z" style="fill:#fff;fill-rule:nonzero;"/><path d="M121.544,0l0,10.626c1.42,-2.36 4.052,-3.731 6.8,-3.542c2.36,-0.089 4.646,0.851 6.259,2.576c1.674,1.934 2.533,4.445 2.395,7l0,13.124l-6.842,0l0,-12.2c0.078,-1.228 -0.334,-2.437 -1.147,-3.361c-1.801,-1.575 -4.518,-1.575 -6.319,0c-0.813,0.924 -1.225,2.133 -1.147,3.361l0,12.2l-6.882,0l0,-29.784l6.883,0Z" style="fill:#fff;fill-rule:nonzero;"/></g></svg>
            <div v-if="signedIn">
                <svg class="i-switch" @click="switchView" viewBox="0 0 22 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><g><path d="M7.318,13.223c-0.088,0 -0.161,-0.073 -0.161,-0.161l0,-2.974c0,-0.088 0.073,-0.161 0.161,-0.161l9.139,0c0.088,0 0.161,-0.073 0.161,-0.161l0,-2.405c0,-0.001 0,-0.003 0,-0.004c0,-0.113 0.092,-0.205 0.205,-0.205c0.056,0 0.11,0.023 0.149,0.064l4.245,4.24c0.03,0.03 0.047,0.071 0.047,0.114c0,0.043 -0.017,0.084 -0.047,0.114l-4.32,4.325c-0.03,0.031 -0.072,0.048 -0.115,0.048c-0.088,0 -0.161,-0.072 -0.161,-0.161c0,0 0,-0.001 0,-0.001l0,-2.51c0,0 0,-0.001 0,-0.001c0,-0.088 -0.073,-0.161 -0.161,-0.161c-0.001,0 -0.002,0 -0.003,0l-9.139,0Z" style="fill:#fff;"/><path d="M13.946,2.833c0.088,0 0.161,0.073 0.161,0.161l0,2.974c0,0.088 -0.073,0.161 -0.161,0.161l-9.139,0c-0.088,0 -0.161,0.073 -0.161,0.161l0,2.405c0,0.001 0,0.003 0,0.004c0,0.113 -0.092,0.205 -0.205,0.205c-0.056,0 -0.11,-0.023 -0.149,-0.064l-4.245,-4.24c-0.03,-0.03 -0.047,-0.071 -0.047,-0.114c0,-0.043 0.017,-0.084 0.047,-0.114l4.32,-4.325c0.03,-0.031 0.072,-0.048 0.115,-0.048c0.088,0 0.161,0.072 0.161,0.161c0,0 0,0.001 0,0.001l0,2.51c0,0 0,0.001 0,0.001c0,0.088 0.073,0.161 0.161,0.161c0.001,0 0.002,0 0.003,0l9.139,0Z" style="fill:#fff;"/></g></svg>
                <svg class="i-search" @click="toggleSearch" viewBox="0 0 27 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule: evenodd; clip-rule: evenodd; stroke-linecap: round; stroke-linejoin: round; stroke-miterlimit: 1.41421;"><circle cx="10.136" cy="10.136" r="7.56" style="fill: none; stroke-width: 2.97px; stroke: rgb(255, 255, 255);"></circle><path d="M15.884,15.014l7.869,7.87" style="fill: none; stroke-width: 2.97px; stroke: rgb(255, 255, 255);"></path></svg>
            </div>
            <input class="search" placeholder="Search sites" type="text" aria-label="Search" autocomplete="off" spellcheck="false">
        </div>
    </div>
</template>

<script>
import Links from "@/components/Links.vue";
import SubmitSite from "@/components/SubmitSite.vue";

export default {
  components: {
    Links,
    SubmitSite
  },
  computed: {
    signedIn: function() {
      return this.$store.state.signedIn;
    }
  },
  methods: {
    toggleSearch: function() {
      console.log("search has been clicked");
      let search = document.querySelector(".search");
      let reveal = document.querySelector(".reveal");
      if (reveal && !document.querySelector(".search.reveal")) {
        reveal.classList.remove("reveal");
        setTimeout(() => {
          search.classList.add("reveal");
          search.focus();
        }, 200);
      } else {
        search.classList.add("reveal");
        search.focus();
        document.querySelector(".i-add").classList.add("close");
      }
    },
    switchView: function() {
      console.log("switch has been clicked");
    }
  }
};
</script>

<style lang="stylus">
.header
    width: 440px
    margin: 0 auto

.navbar
    background: #363636
    padding: 0px 30px
    height: 60px
    border-radius: 5px
    position: relative
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2)
    display: flex
    justify-content: space-between
    align-items: center
    z-index: 3

    svg
        height: 20px
        cursor: pointer
        transition: all 200ms

        path
            pointer-events: none

    .logo
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)

    >div
        display: flex
        align-items: center

        &:last-of-type
            svg
                padding-left: 15px

.search
    position: absolute
    background: #1D1D1D
    width: 100%
    height: 45px
    box-sizing: border-box
    border: none
    border-radius: 5px
    font-weight: 500
    font-size: 16px
    padding: 0 0 1px 28px
    color: #FFFFFF
    transform: translateY(-10px)
    transition: all 200ms
    opacity: 0
    left: 0
    top: 75px
    z-index: -1

    &:placeholder
        color: #B1B1B1

.reveal
    transform: translateY(0)
    opacity: 1
    z-index: 1

.close
    transform: rotate(45deg)
</style>
