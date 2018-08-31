import http from '@/libs/axios'

export default {
  namespace: 'user',
  services: {
    // 登录
    login: (...args) => http.post('/sign_in', ...args),
    // 用户列表
    list: (...args) => http.get('/users', ...args)
  }
}
