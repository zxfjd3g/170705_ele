<template>
  <div>
    <ele-header/>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import axios from 'axios'
  import header from './components/header/header.vue'

  export default {

    mounted(){
      // 使用vue-resource发送ajax请求express提供mock接口
      this.$http.get('/api/seller')
        .then(response => {
          const result = response.data
          console.log('vue-resource', result)
        })
      // 使用axios发送ajax请求mockjs提供mock接口
      axios.get('/api2/seller')
        .then(response => {
          const result = response.data
          console.log('axios', result)
        })

      // 通过dispath()来触发action调用获取后台seller数据
      this.$store.dispatch('getSeller')
    },

    components: {
      'ele-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixins.styl"
  .tab
    height 40px
    display flex
    justify-content space-around
    align-items center
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      font-size 14px
      &>a
        color rgb(77,85,93)
      .router-link-active
        color rgb(240,20,20)

</style>
