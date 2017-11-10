/*
使用mockjs来模拟数据接口
 */
import Mock from 'mockjs'
import data from './data.json'

// 映射几个接口
Mock.mock('/api2/goods', {
  code: 0,
  data: data.goods
})
Mock.mock('/api2/ratings', {
  code: 0,
  data: data.ratings
})
Mock.mock('/api2/seller', {
  code: 0,
  data: data.seller
})

// 向外暴露什么?   不需要, 只需要让当前文件被执行一次即可

