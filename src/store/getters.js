export default {

  // 购物车中的food列表
  foodList (state) {
    const foods = []
    state.goods.forEach(good => {
      good.foods.forEach(food => {
        if(food.count) {
          foods.push(food)
        }
      })
    })

    return foods
  },

  // 购物车中food的总数量
  totalCount (state, getters) {
    return getters.foodList.reduce((preTotal, food) => preTotal + food.count, 0)
  },

  // 购物车中food的总价格
  totalPrice (state, getters) {
    return getters.foodList.reduce((preTotal, food) => preTotal + food.count*food.price, 0)
  }
}