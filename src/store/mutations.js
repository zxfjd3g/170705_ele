import {RECEIVE_SELLER, RECEIVE_GOODS, RECEIVE_RATINGS} from './mutation-types'
export default {
  [RECEIVE_SELLER] (state, {seller}) {
    state.seller = seller
  },

  [RECEIVE_GOODS] (state, {goods}) {
    state.goods = goods
  },

  [RECEIVE_RATINGS] (state, {ratings}) {
    state.ratings = ratings
  }
}