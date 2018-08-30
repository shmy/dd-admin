const RESOURCE_PATH = '/resource/'
const USER_PATH = '/user/'
const AD_PATH = '/ad/'

const MAPS = [
  // 社区管理
  { id: 1, title: '资源管理', path: `${RESOURCE_PATH}index`, icon: 'home', pid: null },
  { id: 2, title: '用户管理', path: `${USER_PATH}index`, icon: 'home', pid: null },
  { id: 3, title: '广告管理', path: `${AD_PATH}index`, icon: 'home', pid: null }
]

const MAP_WITH_COMPONENT = MAPS.filter(item => !!item.path).map(item => ({
  id: item.id,
  pid: item.pid,
  path: item.path,
  meta: { requiresAuth: true, title: item.title },
  component: () => import(`@/pages${item.path}`)
}))
export const routes = MAP_WITH_COMPONENT
export const maps = MAPS
