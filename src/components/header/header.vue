<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟到达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="supportClasses[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="supports_count" v-if="seller.supports" @click="toggleShow">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="toggleShow">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="">
    </div>

    <transition name="fade">
      <div class="detail" v-show="isShow">
        <div class="detail-wrapper">
          <div class="detail-main">
            <div class="name">{{seller.name}}</div>
            <div class="star-wrapper">
              <star :score="seller.score" :size="48"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports">
              <li class="support" v-for="(support, index) in seller.supports" :key="index">
                <span class="icon" :class="supportClasses[support.type]"></span>
                <span class="text">{{support.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="content">
              <p>{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="toggleShow">
          <span class="icon-close"></span>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import star from '../star/star.vue'

  export default {

    data () {
      return {
        supportClasses: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
        isShow: false
      }
    },

    // computed: mapState(['seller'])
    computed: {
      /*seller () {
        return this.$store.state.seller
      }*/
      ...mapState(['seller'])
    },

    methods: {
      toggleShow() {
        this.isShow = !this.isShow
      }
    },

    components: {
      star
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .header
    position relative
    background-color rgba(7, 17, 27, 0.5)
    color #fff
    overflow hidden
    .content-wrapper
      position relative
      padding 24px 12px 18px 24px
      display flex
      .avatar
        width 64px
        height 64px
        & > img
          width 100%
          height 100%
          border-radius 2px
      .content
        margin-left 16px
        padding 2px 0
        .title
          display flex
          .brand
            width 30px
            height 18px
            background-size 30px 18px
            background-repeat no-repeat
            bg-image(brand)

          .name
            margin-left 6px
            font-size 16px
            font-weight bold
            line-height 18px
        .description
          margin-top 8px
          margin-bottom 10px
          font-size 12px
          line-height 12px
          font-weight 200
        .support
          display flex
          .icon
            width 12px
            height 12px
            background-size 12px 12px
            background-repeat no-repeat
          .decrease
            bg-image(decrease_1)
          .discount
            bg-image(discount_1)
          .guarantee
            bg-image(guarantee_1)
          .invoice
            bg-image(invoice_1)
          .special
            bg-image(special_1)

          .text
            margin-left 4px
            font-size 10px
            line-height 12px
            font-weight 200
      .supports_count
        position absolute
        right 12px
        bottom 18px
        height 24px
        padding 7px 8px
        background-color rgba(0, 0, 0, 0.2)
        box-sizing border-box
        border-radius 8px
        line-height 10px
        font-size 10px
        font-weight 200
    .bulletin-wrapper
      position relative
      height 28px
      background-color rgba(7, 17, 27, 0.2)
      padding 0 12px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      line-height 28px
      .bulletin-title
        display inline-block
        vertical-align middle
        width 22px
        height 12px
        background-size 22px 12px
        background-repeat no-repeat
        bg-image(bulletin)

      .bulletin-text
        margin 0 4px
        font-size 10px
        font-weight 200
      & > .icon-keyboard_arrow_right
        position absolute
        top: 6px
        right 7px

    .background
      position absolute
      top: 0
      left 0
      width 100%
      height 100%
      z-index -1
      & > img
        width 100%
        height 100%
        filter blur(10px)

    .detail
      position fixed
      top: 0
      left 0
      width 100%
      height 100%
      background-color rgba(7, 17, 27, 0.8)
      z-index 10
      &.fade-enter-active, &.fade-leave-active
        transition opacity .3s
      &.fade-enter, &.fade-leave-to
        opacity 0
      .detail-wrapper
        min-height 100%
        padding 64px 36px 32px
        .detail-main
          .name
            font-size 16px
            line-height 16px
            font-weight 700
            text-align center
            margin-bottom 16px
          .star-wrapper
            width 100%
            height 24px
            display flex
            justify-content space-around
          .title
            margin-top 28px
            margin-bottom 24px
            display flex
            justify-content space-between
            align-items center
            .line
              width 112px
              height 3px
              background-color rgba(255, 255, 255, 0.2)
            .text
              font-size 14px
              font-weight 700
              line-height 14px
          .supports
            padding 0 12px
            .support
              height 16px
              margin-bottom 12px
              display flex
              .icon
                width 16px
                height 16px
                background-size 16px 16px
                background-repeat no-repeat
              .decrease
                bg-image(decrease_2)
              .discount
                bg-image(discount_2)
              .guarantee
                bg-image(guarantee_2)
              .invoice
                bg-image(invoice_2)
              .special
                bg-image(special_2)

              .text
                margin-left 6px
                font-size 12px
                line-height 12px
                font-weight 200
          .content
            padding 0 12px
            font-size 12px
            line-height 24px
            font-weight 200

      .detail-close
        font-size 32px
        color rgba(255, 255, 255, 0.5)
        margin-top -160px
        text-align center

</style>
