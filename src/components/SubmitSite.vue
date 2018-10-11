<template>
  <div class="submit-site">
      <div class="enter" :class="{slide: slide, active: active == 0}">
          <h4>What's the name of the site?</h4>
          <input v-on:keyup.enter="firstSubmit" type="text" v-focus="active === 0 && isAdd" v-model="enteredValues.siteTitle">
          <p>Hit ENTER when you're ready</p>
      </div>
      <div class="enter" :class="{slide: slide, active: active == 1}">
          <h4>What's the site URL?</h4>
          <input type="text" v-on:keyup.enter="secondSubmit" v-focus="active === 1" v-model="enteredValues.siteUrl">
          <div class="loader" :class="{'loader-show': loader}"></div>
          <p>Hit ENTER to Staash your site</p>
      </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      enteredValues: {},
      slide: false,
      loader: false,
      active: 0
    };
  },
  props: {
    isAdd: Boolean
  },
  methods: {
    firstSubmit: function(e) {
      if (e.target.value == "") {
        this.invalidValue(e.target);
      } else {
        this.active = 1;
        this.slide = true;
        return;
      }
    },
    secondSubmit: function(e) {
      if (
        this.enteredValues.siteUrl.match(
          /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/
        )
      ) {
        this.loader = true;

        fetch("http://localhost:3001/check-url", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ u: this.enteredValues.siteUrl })
        })
          .then(response => {
            return response.status;
          })
          .then(status => {
            if (status === 200) {
              this.loader = false;
              let values = { ...this.enteredValues };
              this.$emit("isAdd");

              setTimeout(() => {
                this.$emit("message", {
                  show: true,
                  message: "Grabbing your site\xa0\xa0👍",
                  success: true,
                  loader: true
                });
              }, 200);

              fetch("http://localhost:3001/api", {
                method: "post",
                headers: new Headers({
                  "Content-Type": "application/json",
                  token: localStorage.getItem("staashToken")
                }),
                body: JSON.stringify(values)
              }).then(response => {
                this.$store.dispatch("getSites");
                this.$emit("message", {
                  show: false,
                  message: "",
                  success: false,
                  loader: false
                });
                this.enteredValues = {};
                console.log(response);
              });
            } else {
              this.loader = false;
              this.invalidValue(e.target);
            }
          });
      } else {
        this.invalidValue(e.target);
      }
    },
    invalidValue: function(el) {
      el.classList.add("error");
      el.addEventListener("webkitAnimationEnd", function() {
        el.classList.remove("error");
      });
    }
  },
  watch: {
    isAdd: function(val) {
      if (!val) {
        this.enteredValues = {};
        this.active = 0;
        setTimeout(() => {
          this.slide = false;
        }, 200);
      }
    }
  },
  directives: {
    focus: {
      componentUpdated: function(el, binding) {
        if (binding.value) {
          el.focus();
        }
      }
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
  transform: translateY(-5px)
  z-index: -1
  pointer-events: none

  .active
    opacity: 1
    user-select: all

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

.slide
  transform: translateX(-455px)

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
