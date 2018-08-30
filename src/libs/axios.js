import axios, { create } from 'axios'
import nprogress from 'nprogress'
import util from '@/libs/util.js'
import { MessageBox } from 'element-ui'

const TIMEOUTED_ERROR_MESSAGE = '请求超时，请稍后再试'
const NETWORK_ERROR_MESSAGE = '网络发生错误，请检查网络设置'
const SERVER_ERROR_MESSAGE = '服务器发生错误，请稍后再试'

let requestCount = 0 // 请求数量
let delayTimeoutId = 0 // timer
const loadingBarDelay = 300 // 延迟显示，当请求响应时间过快时不需要显示loading

const instance = create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api/server' : '/api',
  timeout: 10000,
  responseType: 'json',
  withCredentials: true // 是否允许带cookie这些
})

// $hideLoadingBar 设置不显示进度条
instance.interceptors.request.use(config => {
  !config.$hideLoadingBar && showProgress()
  const token = util.cookies.get('token')
  if (token) { // 注入token
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
}, err => {
  hideProgress()
  return Promise.resolve([null, err])
})

instance.interceptors.response.use(response => {
  hideProgress()
  // Tip: 如果其他的interceptors处理了返回数据，此处有可能会获取不到$hideLoadingBar，做一下处理。如果获取不到则默认隐藏loading
  response.config = response.config || {}
  !response.config.$hideLoadingBar && hideProgress()
  const data = response.data
  const successfully = data.success === true
  if (!successfully) {
    MessageBox.alert(data.message, '提示', { type: 'error' }).then(() => {
      if (data.logback === true) {
        const vm = window.__THIS_VUE_APP__
        vm.$store.dispatch('d2admin/account/logout', {
          vm
        })
      }
    })
  }
  return [data.payload, successfully ? null : new Error(data.message)]
}, err => {
  // 不能reject
  hideProgress()
  if (err.code === 'ECONNABORTED' && ~err.message.indexOf('timeout')) {
    MessageBox.alert(TIMEOUTED_ERROR_MESSAGE, '提示', { type: 'warning' })
  } else {
    MessageBox.alert(err.message.toUpperCase() === 'NETWORK ERROR' ? NETWORK_ERROR_MESSAGE : SERVER_ERROR_MESSAGE, '提示', { type: 'error' })
  }
  return Promise.resolve([null, err])
})

const showProgress = () => {
  if (requestCount === 0) {
    delayTimeoutId = setTimeout(function () {
      nprogress.start()
    }, loadingBarDelay) // 延迟显示，当请求响应时间过快时不需要显示loading
  }
  requestCount++
}
const hideProgress = () => {
  if (requestCount <= 1) {
    window.clearTimeout(delayTimeoutId)
    nprogress.done()
  }
  requestCount--
  requestCount = requestCount < 0 ? 0 : requestCount
}
export default instance

// 不带拦截器纯粹的http请求
export const http = axios
