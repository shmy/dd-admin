import http from '@/libs/axios'

export default {
  namespace: 'user',
  services: {
    // 登录
    login: (...args) => http.post('/admin/sign_in', ...args),
    // 登出
    logout: (...args) => Promise.resolve([1, null])
  }
}
