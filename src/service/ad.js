import http from '@/libs/axios'

export default {
  namespace: 'ad',
  services: {
    // 新增广告
    create: (...args) => http.post('/ad', ...args),
    // 广告列表
    list: (...args) => http.get('/ad', ...args),
    // 删除广告
    del: (id) => http.delete(`/ad/${id}`)
  }
}
