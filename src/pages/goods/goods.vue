<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <!--current-->
          <li class="menu-item" v-for="(good, index) in goods"
              :key="index" :class="{current: index===currentIndex}" @click="clickMenuItem(index)">
            <span class="text border-1px">
              <span class="icon" v-if="good.type>=0" :class="supportClasses[good.type]"></span>{{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li class="food-list food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item border-1px" v-for="(food, index) in good.foods"
                  :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <!--<cartcontrol :food="food" :updateFoodCount="updateFoodCount"></cartcontrol>-->
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart></shopcart>
    </div>
    <food :food="food" ref="food"></food>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'

  import cartcontrol from '../../components/cartcontrol/cartcontrol.vue'
  import shopcart from '../../components/shopcart/shopcart.vue'
  import food from 'components/food/food.vue'

  export default {

    data () {
      return {
        supportClasses: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
        scrollY: 0,
        tops: [],
        food: {}
      }
    },
    mounted() {
      this.$store.dispatch('getGoods', () => { // 当此函数执行时, goods数据状态更新了
        /*setTimeout(() => {
          this.initScroll()
        }, 10)*/
        // 界面更新显示之后才调用回调函数
        this.$nextTick(() => {
          this._initScroll()
          this._initTops()
        })
      })
    },

    methods: {
      _initScroll () {
        // 创建分类列表的scroll对象
        const menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true //分发点击事件
        })
        // 创建食物列表的scroll对象
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true, //分发点击事件
          probeType: 2 //实时派发scroll事件(必须是用户操作)
        })

        // 给foodsScroll绑定scroll监听
        this.foodsScroll.on('scroll', (event) => {
          console.log(event.y)
          this.scrollY = Math.abs(event.y)
        })
        // 给foodsScroll绑定scrollend监听
        this.foodsScroll.on('scrollEnd', (event) => {
          console.log("scrollend", event.y)
          this.scrollY = Math.abs(event.y)
        })
      },

      _initTops () {
        const tops = []
        let top = 0
        tops.push(top)
        const lis = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        Array.prototype.slice.call(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })
        // 更新状态
        this.tops = tops
        console.log(this.tops)
      },

      clickMenuItem (index) {
        console.log('clickMenuItem()', index)
        // 右侧平滑滚动到指定的位置
        this.foodsScroll.scrollTo(0, -this.tops[index], 300)
        // 指定最终scrollY
        this.scrollY = this.tops[index]
      },

      /*updateFoodCount (food, isAdd) {
        console.log('updateFoodCount()', isAdd)
        if(isAdd) { // 加1
          if(food.count) {
            food.count++
          } else { // 第一次
            // food.count = 1  //给food添加count属性, 值为1    没有数据绑定, 界面不会更新
            this.$set(food, 'count', 1)  // 新加的属性就有了数据绑定, 界面就会更新
          }
        } else { // 减1
          if(food.count) {
            food.count--
          }
        }
      }*/

      showFood (food) {
        // 更新food状态
        this.food = food
        // 显示food
        this.$refs.food.toggleShow()
      }
    },

    computed: {
      ... mapState(['goods']),
      currentIndex () {
        const {scrollY, tops} = this
        // 拿scrollY与当前top和下一个top: scrollY>=top && scrollY<nextTop
        const index = tops.findIndex((top, index)=> {
          return scrollY>=top && scrollY<tops[index+1]
        })
        console.log('currentIndex()', index)
        return index
      }
    },

    components: {
      cartcontrol,
      shopcart,
      food
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>