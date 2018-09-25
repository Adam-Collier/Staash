<template>
    <div>
        <svg class="i-add" @click="showAdd" viewBox="0 0 931 931" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:square;stroke-linejoin:round;stroke-miterlimit:1.41421;height:16px;"><g><path d="M465.131,47.631l0,835" style="fill:none;stroke-width:130px;stroke:#fff;"/><path d="M882.631,465.131l-835,0" style="fill:none;stroke-width:130px;stroke:#fff;"/></g></svg>
        <div class="submit-site">
            <div class="enter active">
                <h4>What's the name of the site?</h4>
                <input tabindex="1" v-on:keyup.enter="firstSubmit" type="text">
                <p>Hit ENTER when you're ready</p>
            </div>
            <div class="enter">
                <h4>Whats the site URL?</h4>
                <input type="text" data-url v-on:keyup.enter="secondSubmit">
                <div class="loader"></div>
                <p>Hit ENTER when you're ready</p>
            </div>
            <div class="enter submit" tabindex='1' v-on:keyup.enter="finalSubmit">
                <div>
                    <h4>Hit enter to grab your site 👍</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      validSite: "",
      siteUrl: "",
      enteredValues: {}
    };
  },
  methods: {
    showAdd: function(e) {
      if (e.target.classList.contains("close")) {
        document.querySelector(".reveal").classList.remove("reveal");
        document.querySelector(".close").classList.remove("close");
        setTimeout(() => {
          document.querySelectorAll(".enter").forEach((x, i) => {
            i === 0 ? x.classList.add("active") : x.classList.remove("active");
            x.style.transform = "translateX(0)";
          });
        }, 300);
      } else {
        e.target.classList.add("close");
        this.enteredValues = {};

        let submitSite = document.querySelector(".submit-site");
        submitSite.classList.add("reveal");
        submitSite.querySelector("div > input").focus();
      }
      console.log("add has been clicked");
    },
    firstSubmit: function(e) {
      this.$set(this.enteredValues, "siteTitle", e.target.value);

      let card = e.target.parentElement;

      let index = Array.from(card.parentElement.children).indexOf(
        e.target.parentElement
      );

      card.classList.remove("active");
      card.nextSibling.classList.add("active");
      card.nextSibling.querySelector("input").focus();

      document.querySelectorAll(".enter").forEach(x => {
        x.style.transform = `translateX(${(index + 1) * -455}px)`;
      });

      return;
    },
    secondSubmit: function(e) {
      let input = e.target;
      let card = e.target.parentElement;

      if (
        input.value.match(
          /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/
        )
      ) {
        let loader = document.querySelector(".loader");
        loader.classList.add("loader-show");

        fetch("http://localhost:3001/check-url", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ u: e.target.value })
        })
          .then(response => {
            return response.status;
          })
          .then(status => {
            if (status === 200) {
              this.$set(this.enteredValues, "siteUrl", e.target.value);

              loader.classList.remove("loader-show");
              card.classList.remove("active");
              card.nextSibling.classList.add("active");
              document.querySelectorAll(".enter").forEach(x => {
                x.style.transform = `translateX(${2 * -455}px)`;
              });
              input.parentElement.nextSibling.focus();
            } else {
              loader.classList.remove("loader-show");
              input.classList.add("error");
              input.addEventListener("webkitAnimationEnd", function() {
                input.classList.remove("error");
              });
            }
          });
      } else {
        input.classList.add("error");
        input.addEventListener("webkitAnimationEnd", function() {
          input.classList.remove("error");
        });
      }
    },
    finalSubmit: function() {
      console.log("this is the final");
      console.log({ ...this.enteredValues });

      document.querySelector(".reveal").classList.remove("reveal");
      document.querySelector(".close").classList.remove("close");
      setTimeout(() => {
        document.querySelectorAll(".enter").forEach((x, i) => {
          i === 0 ? x.classList.add("active") : x.classList.remove("active");
          x.style.transform = "translateX(0)";
        });
      }, 300);

      fetch("http://localhost:3001/api", {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json",
          token: localStorage.getItem("staashToken")
        }),
        body: JSON.stringify({ ...this.enteredValues })
      }).then(response => {
        this.$store.dispatch("getTeamSites");
        console.log(response);
      });
    }
  }
};
</script>

<style lang="stylus">
.submit-site
  position: absolute
  top: 65px
  left: 0
  white-space: nowrap
  opacity: 0
  transition: all 200ms ease-in-out
  transform: translateY(-2px)
  z-index: -1
  pointer-events: none

  .active
    opacity: 1

.enter
  background: #1D1D1D
  width: 410px
  border-radius: 5px
  padding: 20px 0 10px 30px
  display: inline-block
  color: #FFFFFF
  margin-right: 15px
  transition: all 200ms ease-in-out
  position: relative
  opacity: 0.95
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2)

  &:focus
    outline: none

  h4
    color: #FFFFFF
    margin: 0 0 5px 0

  p
    font-size: 12px
    color: #969696

  input
    background: #2c2c2c
    position: relative
    width: calc(440px - 60px)
    height: 36px
    box-sizing: border-box
    border: none
    border-radius: 5px
    margin-top: 10px
    font-weight: 500
    font-size: 16px
    padding: 0 0 1px 8px
    color: #FFFFFF
    transition: all 250ms ease-in-out

  .error
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both
    background: #a91919

.submit
  color: #FFFFFF
  background: #50A23C
  width: 400px
  height: 100%
  vertical-align: top
  height: 108.59px
  padding: 20px

  >div
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center

.loader
  width: 20px
  right: 32px
  height: 36px
  position: absolute
  transform: translateY(-36px)
  opacity: 0
  transition: all 50ms ease-in

  &:before
    content: ''
    box-sizing: border-box
    position: absolute
    top: 48%
    width: 20px
    height: 20px
    margin-top: -10px
    margin-left: -10px
    border-radius: 50%
    border: 2px solid #4a4a4a
    border-top-color: #FFFFFF
    animation: spinner 500ms linear infinite

.loader-show
  opacity: 1

@keyframes shake
  10%, 90%
    transform: translate3d(-1px, 0, 0)

  20%, 80%
    transform: translate3d(2px, 0, 0)

  30%, 50%, 70%
    transform: translate3d(-4px, 0, 0)

  40%, 60%
    transform: translate3d(4px, 0, 0)

@keyframes spinner
  to
    transform: rotate(360deg)
</style>
