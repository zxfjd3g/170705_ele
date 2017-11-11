/*
包含ajax请求的代码的模块
 */
import axios from 'axios'

export const RESULT_OK = 0

export function reqSeller() { // 返回是promise对象
  return axios.get('/api2/seller')
}

export function reqGoods() {
  return axios.get('/api2/goods')
}

export function reqRatings() {
  return axios.get('/api2/ratings')
}