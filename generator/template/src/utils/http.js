import axios from 'axios'
import Qs from 'qs'
import { Toast } from 'vant'

const myAxios = axios.create({
  timeout: 1000 * 10,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  paramsSerializer: function (params) {
    return Qs.stringify(params)
  }
})
// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers = {
    'Content-Type': 'application/json'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '请求错误'
        break
      case 401:
        error.message = '会话超时'
        break
      case 403:
        error.message = '拒绝访问'
        break
      case 404:
        error.message = '请求地址出错'
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务器错误'
        break
      case 501:
        error.message = '服务未实现'
        break
      case 502:
        error.message = '网关错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网关超时'
        break
      case 505:
        error.message = 'HTTP版本不受支持'
        break
      default:
    }
  } else if (error.code === 'ECONNABORTED' || error.message.indexOf('timeout') !== -1) {
    error.message = '请求超时'
  } else if (error.message === 'Network Error') error.message = '网络错误'
  Toast.fail(error.message)
  return Promise.reject(error.message)
})

export function post({ url, param }) {
  return new Promise((resolve, reject) => {
    myAxios.post(url, param).then(res => {
      resolve(res.data)
    }).catch(error => {
      reject(error)
    })
  })
}

export function get({ url, param }) {
  return new Promise((resolve, reject) => {
    myAxios.get(url, { params: param }).then(res => {
      resolve(res.data)
    }).catch(error => {
      reject(error)
    })
  })
}
