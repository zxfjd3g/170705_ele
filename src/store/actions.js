import {reqSeller, reqGoods, reqRatings, RESULT_OK} from '../api'
import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_SELLER,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART
} from './mutation-types'

export default {

  // 获取商家信息
  getSeller({commit}) {
    // 发送ajax请求, 获取seller数据
    reqSeller().then(response => {
      const result = response.data
      if(result.code===RESULT_OK) {
        const seller = result.data
        // 提交mutaion请求
        commit(RECEIVE_SELLER, {seller})
      }
    })
  },

  // 获取商品列表信息
  getGoods({commit}, cb) {
    // 发送ajax请求, 获取goods数据
    reqGoods().then(response => {
      const result = response.data
      if(result.code===RESULT_OK) {
        const goods = result.data
        // 提交mutaion请求
        commit(RECEIVE_GOODS, {goods})
        // 如果传递了回调函数, 调用回调函数通知调用者
        cb && cb()
      }
    })
  },

  // 获取评价列表信息
  getRatings({commit}, cb) {
    // 发送ajax请求, 获取ratings数据
    reqRatings().then(response => {
      const result = response.data
      if(result.code===RESULT_OK) {
        const ratings = result.data
        // 提交mutaion请求
        commit(RECEIVE_RATINGS, {ratings})

        cb && cb()
      }
    })
  },

  // 更新food的数量
  updateFoodCount({commit}, {food, isAdd}) {
    if(isAdd) { // 加1
      commit(INCREMENT_FOOD_COUNT, {food})
    } else { // 减1
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },

  // 清空购物车
  clearCart ({commit}, foodList) {
    commit(CLEAR_CART, {foodList})
  }
}