<template>
  <div>
    <div>
      手机号: <input type="text" v-model="phone"><br>
      验证码: <input type="text" v-model="code">
      <button @click="sendCode">发送验证码</button><br>
      <button @click="login">登陆</button>
    </div>

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
    data () {
      return {
        phone: '',
        code: ''
      }
    },
    methods: {
      sendCode () {
        const url = `/sendcode?phone=${this.phone}`
        axios.get(url).then(response => {
          alert(response.data.code) // 0
        })
      },

      login () {
        axios.post('/login', {phone: this.phone, code: this.code}).then(response => {
          console.log('login result ', response.data)
          const result = response.data
          if (result.code == 0) {
            const user = result.data
            alert(`登陆成功: ${user.phone}`)
          } else {
            alert(`登陆失败, 请输入正确的手机号和验证码`)
          }
        })
      },
    },

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
