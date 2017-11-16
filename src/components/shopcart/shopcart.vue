<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight: totalCount>0}">
              <i class="icon-shopping_cart" :class="{highlight: totalCount>0}"></i>
            </div>
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{seller.deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click="pay">
          <div class="pay" :class="payClass">
            {{payText}}
          </div>
        </div>
      </div>
      <div class="ball-container">
        <transition v-for="(ball, index) in balls"
                    :key="index"
                    @before-enter="beforeDrop"
                    @enter="drop"
                    @after-enter="afterDrop"
                    :css="false">
          <div class="ball" v-show="ball.isShow">
            <div class="inner inner-hook"></div>
          </div>
        </transition>

      </div>

      <transition name="slide">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <!--<span class="empty" @click="clear">清空</span>-->
            <mt-button style="float: right" type="primary" @click.native="clear">清空</mt-button>
          </div>

          <div class="list-content" ref="shopList">
            <ul>
              <li class="food" v-for="(food, index) in foodList" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price"><span>￥{{food.price}}</span></div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
    </transition>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import {MessageBox, Toast} from 'mint-ui'
  import BScroll from 'better-scroll'
  import {mapState, mapGetters} from 'vuex'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'

  export default {

    data () {
      return {
        isShow: false,
        balls: [
          {isShow: false},
          {isShow: false},
          {isShow: false},
          {isShow: false},
          {isShow: false},
          {isShow: false}
        ],
        droppingBalls: []  // 保存isShow为true的ball
      }
    },
    
    
    mounted () {
      // 订阅消息(startBallDrop)
      PubSub.subscribe('startBallDrop', (msg, startEl) => {
        // 找到一个隐藏的小球(对应的ball对象)
        const ball = this.balls.find(ball => {
          return !ball.isShow
        })
        // 显示小球
        if(ball) {
          ball.isShow = true
          // 保存对应的startEl
          ball.startEl = startEl
          // 保存ball到droppingBalls
          this.droppingBalls.push(ball)
        } else {
          console.log('没有ball了')
        }
      })
    },

    methods: {
      /*
      回调函数关注2个点:
      1. 什么时候调用?
      2. 做什么事?
      */
      // 在开始进入之前调用, 确定动画起始时的样式状态
      beforeDrop (el) {
        console.log('beforeDrop()')
        const ball = this.droppingBalls.shift() // 从数组中删除第一个并返回它
        const startEl = ball.startEl

        // 计算偏移量
        let offsetY = 0
        let offsetX = 0
        const elLeft = 32
        const elBottom = 22
        const {left, top} = startEl.getBoundingClientRect()
        offsetX = left - elLeft
        offsetY = -(window.innerHeight - elBottom - top)

        // 指定样式
        el.style.transform = `translateY(${offsetY}px)`
        el.children[0].style.transform = `translateX(${offsetX}px)`

        // 保存ball
        el.ball = ball
      },

      // 在开始进入进调用, 确定动画结束时的样式状态
      drop (el) {
        console.log('drop()')

        // 强制重排重绘
        const temp = el.clientHeight
        //必须异步执行
        this.$nextTick(() => {
          // 指定样式
          el.style.transform = `translateY(0)`
          el.children[0].style.transform = `translateX(0)`
        })

      },

      // 在动画结束之后调用, 做一些收尾工作(隐藏小球)
      afterDrop (el) { // 立即调用了
        console.log('afterDrop()')

        // 样式中指定的隐藏过渡时间没用了, 手动指定延迟隐藏
        // el.ball.isShow = false  // 立即隐藏
        setTimeout(() => {
          el.ball.isShow = false
        }, 400)
      },


      toggleShow () {
        this.isShow = !this.isShow
      },

      clear () {
        /*if(confirm('确认清除购物车吗?')) {
          this.$store.dispatch('clearCart', this.foodList)
        }*/

        MessageBox.confirm('确定删除吗?').then(action => {
          this.$store.dispatch('clearCart', this.foodList)
          Toast({
            message: '清除成功',
            position: 'bottom',
            duration: 2000
          });
        }, action => {
          // alert('取消')
        });
      },

      pay () {
        const {totalPrice} = this
        const {minPrice, deliveryPrice} = this.seller
        if(totalPrice>=minPrice) {
          alert(`支付${totalPrice+deliveryPrice}`)
        } else {
          alert('未达到起送价, 无法配送!')
        }
      }
    },

    computed: {
      ...mapState(['seller']),
      ...mapGetters(['foodList', 'totalCount', 'totalPrice']),
      payClass () {
        return this.totalPrice>=this.seller.minPrice ? 'enough' : 'not-enough'
      },
      payText () {
        const {totalPrice} = this
        const {minPrice} = this.seller
        if(totalPrice===0) {
          return `￥${minPrice}元起送`
        } else if(totalPrice<minPrice) {
          return `还差￥${minPrice-totalPrice}元起送`
        } else {
          return '去结算'
        }
      },

      listShow () {
        const {totalCount, isShow} = this
        if(totalCount===0) {
          this.isShow = false
          return false
        }

        if(isShow) { // 此时去显示列表去的
          this.$nextTick(() => {
            // 创建scroll单例对象
            if(!this.scroll) {
              this.scroll = new BScroll(this.$refs.shopList, {
                click: true
              })
            } else {
              this.scroll.refresh() //通知scroll对象更新, 形成滑动
            }

          })
        }

        return isShow
      }
    },

    components: {
      cartcontrol
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform: translateY(-100%)
      &.slide-enter-active, &.slide-leave-active
        transition transform .5s
      &.slide-enter, &.slide-leave-to
        transform: translateY(0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
      background: rgba(7, 17, 27, 0)
</style>