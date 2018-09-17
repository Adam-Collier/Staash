<template>
  <div class="sites" v-if="this.sites">
      <a class="site" v-for="site in sites" :key="site.id" :href="site.siteUrl">
        <div>
          <h1>{{site.siteTitle}}</h1>  
          <img :src="QRCode(site.siteUrl)" v-if="$store.state.desktop" alt="">
        </div>
        <img :src="$store.state.desktop ? site.desktopImage : site.mobileImage" alt="" />
        <div>
          <p>{{site.date}}</p>
          <p>Added by {{site.author}}</p>
        </div>
      </a>
  </div>
</template>

<script>
import QRCode from "qrcode";

export default {
  beforeCreate: function() {
    this.$store.dispatch("getSites");
  },
  computed: {
    sites() {
      let sites = Array.from(this.$store.state.sites);
      return sites.filter(sites => {
        return sites.siteTitle
          .toLowerCase()
          .includes(this.$store.state.filterBy.toLowerCase());
      });
    }
  },
  methods: {
    QRCode: function(url) {
      let qr;
      let opts = {
        color: {
          light: "#0000"
        }
      };
      QRCode.toDataURL(url, opts, function(err, code) {
        qr = code;
      });
      return qr;
    }
  }
};
</script>

<style lang="stylus">
.sites
  width: calc(100vw - 35px)
  height: calc(100vh - 106px)
  overflow-x: auto
  overflow-y: visible
  -webkit-overflow-scrolling: touch
  white-space: nowrap
  padding-left: 35px
  padding-top: 6vh

.site
  display: inline-block
  vertical-align: top
  margin-right: 50px
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.15)
  border-radius: 5px

  &:hover
    text-decoration: none

  div
    &:first-of-type
      padding-bottom: 18px
      padding: 10px 10px 10px 20px

      img
        width: 45px
        z-index: 0

    &:last-of-type, &:first-of-type
      display: flex
      align-items: center
      justify-content: space-between

    &:last-of-type
      padding: 15px 15px 12px 20px

  >img
    height: 60vh
    border-top: 1px solid #ebebeb
    border-bottom: 1px solid #ebebeb
    display: block

  p
    margin: 0
</style>
