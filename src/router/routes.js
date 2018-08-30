/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登陆
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  // 403
  {
    path: '/forbidden',
    name: 'forbidden',
    component: () => import('@/pages/error-page-403')
  },
  // 404
  {
    path: '*',
    name: 'notfound',
    component: () => import('@/pages/error-page-404')
  }
]

// 重新组织后导出
export default [
  ...frameOut,
  ...errorPage
]
