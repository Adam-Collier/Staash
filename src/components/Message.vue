<template>
  <div class="message" :class="{error, success}">
    <p>{{message}}</p>
    <div class="loader" v-if="this.loader"></div>
  </div>
</template>

<script>
export default {
  props: {
    success: Boolean,
    error: Boolean,
    message: String,
    loader: Boolean
  }
};
</script>

<style lang="stylus">
.error
  background: red

.success
  background: green

.message
  position: absolute
  left: 0
  top: 65px
  height: 55px
  background: #008000
  width: 100%
  border-radius: 5px
  transform: translateY(-5px)
  transition: all 300ms ease-in-out
  color: #FFF
  display: flex
  justify-content: center
  align-content: center
  opacity: 0

  p
    margin: 0

  .loader
    width: 20px
    top: 50%
    right: 18px
    height: 36px
    position: absolute
    transform: translateY(-50%)
    opacity: 1
    transition: all 50ms ease-in

    &:before
      content: ''
      box-sizing: border-box
      position: absolute
      top: 50%
      width: 20px
      height: 20px
      margin-top: -10px
      margin-left: -10px
      border-radius: 50%
      border: 2px solid #216521
      border-top-color: #093209
      animation: spinner 450ms linear infinite

@keyframes spinner
  to
    transform: rotate(360deg)
</style>
