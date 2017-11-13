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

  totalCount (state, getters) {
    return getters.foodList.reduce((preTotal, food) => preTotal + food.count, 0)
  },

  totalPrice (state, getters) {
    return getters.foodList.reduce((preTotal, food) => preTotal + food.count*food.price, 0)
  }
}