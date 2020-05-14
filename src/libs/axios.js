import axios from 'axios'
import { Message } from 'element-ui'

const ConfigBaseURL = '/' //默认路径，这里也可以使用env来判断环境
let loadingInstance = null //这里是loading

//使用create方法创建axios实例
export const Axios = axios.create({
  timeout: 15000, // 请求超时时间
  baseURL: ConfigBaseURL,
  method: 'post',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
// 添加请求拦截器
Axios.interceptors.request.use(config => {
  return config
})
// 添加响应拦截器
Axios.interceptors.response.use(response => {
  return response.data
}, error => {
  console.log('error:', error)
  const msg = error.Message !== undefined ? error.Message : ''
  Message({
    message: '网络错误' + msg,
    type: 'error',
    duration: 3 * 1000
  })
  loadingInstance.close()
  return Promise.reject(error)
})