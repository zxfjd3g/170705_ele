<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" v-for="(item, index) in starClasses"
          :class="item" :key="index"></span>
  </div>
</template>

<script>
  export default {
    props: {
      score: Number,
      size: Number
    },
  /*
  3.5: 3+1+1
  3.4: 3+2
   */
    computed: {
      starClasses () {
        const {score, size} = this
        const scs = []
        const scoreInteger = Math.floor(score)
        // 向scs中添加 `star${size} on`
        for (let i = 0; i < scoreInteger; i++) {
          scs.push(`star${size} on`)
        }
        // 向scs中添加 `star${size} half`
        if(score-scoreInteger>=0.5) {
          scs.push(`star${size} half`)
        }
        // 向scs中添加 `star${size} off`
        while(scs.length<5) {
          scs.push(`star${size} off`)
        }

        return scs
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>