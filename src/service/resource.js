import http from '@/libs/axios'

export default {
  namespace: 'resource',
  services: {
    // 资源列表
    list: (id, ...args) => http.get(`/classification/${id}`, ...args),
    // 资源详情
    detail: (id, ...args) => http.get(`/video/${id}`, ...args),
    // 更新资源
    update: (id, ...args) => http.put(`/video/${id}`, ...args)
  }
}
