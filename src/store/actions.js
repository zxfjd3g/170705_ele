import {reqSeller, reqGoods, reqRatings, RESULT_OK} from '../api'
import {RECEIVE_GOODS, RECEIVE_RATINGS, RECEIVE_SELLER} from './mutation-types'

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
  getGoods({commit}) {
    // 发送ajax请求, 获取goods数据
    reqGoods().then(response => {
      const result = response.data
      if(result.code===RESULT_OK) {
        const goods = result.data
        // 提交mutaion请求
        commit(RECEIVE_GOODS, {goods})
      }
    })
  },

  // 获取评价列表信息
  getRatings({commit}) {
    // 发送ajax请求, 获取ratings数据
    reqRatings().then(response => {
      const result = response.data
      if(result.code===RESULT_OK) {
        const ratings = result.data
        // 提交mutaion请求
        commit(RECEIVE_RATINGS, {ratings})
      }
    })
  },
}