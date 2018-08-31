<template>
    <div>
        <svg class="i-add" @click="showAdd" viewBox="0 0 931 931" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:square;stroke-linejoin:round;stroke-miterlimit:1.41421;"><g><path d="M465.131,47.631l0,835" style="fill:none;stroke-width:130px;stroke:#fff;"/><path d="M882.631,465.131l-835,0" style="fill:none;stroke-width:130px;stroke:#fff;"/></g></svg>
        <div class="submit-site">
            <div class="enter">
                <h4>Whats the name of the site?</h4>
                <input tabindex="1" v-on:keyup.enter="nextSubmit" type="text">
                <p>Hit ENTER when you're ready</p>
            </div>
            <div class="enter">
                <h4>Whats the site URL?</h4>
                <input type="text" v-on:keyup.enter="nextSubmit">
                <p>Hit ENTER when you're ready</p>
            </div>
            <div class="enter submit">
                <div>
                    <h4>Hit enter to grab your site 👍</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    showAdd: function(e) {
      if (e.target.classList.contains("close")) {
        document.querySelector(".reveal").classList.remove("reveal");
        document.querySelector(".close").classList.remove("close");
        setTimeout(() => {
          document
            .querySelectorAll(".enter")
            .forEach(x => (x.style.transform = "translateX(0)"));
        }, 300);
      } else {
        e.target.classList.add("close");
        let submitSite = document.querySelector(".submit-site");
        submitSite.classList.add("reveal");
        submitSite.querySelector("div > input").focus();
      }
      console.log("add has been clicked");
    },
    nextSubmit: function(e) {
      let card = e.target.parentElement;

      let index = Array.from(card.parentElement.children).indexOf(
        e.target.parentElement
      );

      console.log(card.nextSibling.querySelector("input"));
      index == 0
        ? e.target.parentElement.nextSibling.querySelector("input").focus()
        : null;

      // TODO
      // WHEN HIT ENTER ON THE LAST CARD THAT SUBMITS ALL OF THE DATA
      // RUN THROUGH ALL OF THE INPUTS, STORE IN A JSON OBJ THEN POST TO THE SERVER

      document.querySelectorAll(".enter").forEach(x => {
        x.style.transform = `translateX(${(index + 1) * -455}px)`;
      });
      return;
    }
  }
};
</script>

<style lang="stylus">
.submit-site
    position: absolute
    top: 75px
    left: 0
    white-space: nowrap
    opacity: 0
    transition: all 200ms ease-in-out
    transform: translateY(-10px)
    z-index: -1

    &:after, &:before
        content: ''
        position: absolute
        top: 0
        height: 100%
        width: 100%
        background: white
        border-radius: 5px
        z-index: 3
        opacity: 0.7

    &:after
        left: calc(440px + 15px)

    &:before
        left: calc(-100% - 15px)

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

    h4
        color: #FFFFFF
        margin: 0 0 5px 0

    p
        font-size: 12px
        color: #969696

    input
        background: #2c2c2c
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
        transition: all 200ms

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
</style>
