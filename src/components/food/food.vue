<template>
  <div v-show="isShow">
    {{food}}
  </div>
</template>

<script>
  export default {
    props: {
      food: Object
    },

    data () {
      return {
        isShow: false
      }
    },

    methods: {
      toggleShow() {
        this.isShow = !this.isShow
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>