import layoutHeaderAside from '@/layout/header-aside'
import mixin from '@/plugin/mixin'
import { maps, routes } from '@/menu/map'
// 递归成树状
function recursion (data, pid) {
  const result = []
  let temp
  for (let item of data) {
    if (item.pid === pid) {
      temp = recursion(data, item.id)
      if (temp.length) {
        item.children = temp
      }
      result.push(item)
    }
  }
  return result
}

// 根据ids生成路由结构
export const generateDynamicRouting = allowIds => {
  let data = routes
  if (allowIds.length !== 0) {
    data = routes.filter(item => {
      // return ~allowIds.indexOf(item.id) || ~allowIds.indexOf(item.pid)
      return ~allowIds.indexOf(item.id)
    })
  }
  const frameInChildren = data.map((item, index) => {
    const generalName = item.path.replace(/\//g, '_').replace(/^_/, '')
    item.component().then(component => {
      // d2的设计 组件第一项的name必须是叫index
      component.default.name = index === 0 ? 'index' : generalName
      // 添加minxi
      component.default.mixins = [mixin]
      return component
    })
    return {
      ...item,
      // d2的设计 默认页的name必须是叫index
      name: index === 0 ? 'index' : generalName
    }
  })
  return [
    {
      path: '/',
      redirect: { name: frameInChildren.length > 0 ? frameInChildren[0].name : 'forbidden' },
      component: layoutHeaderAside,
      children: frameInChildren
    }
  ]
}

// 根据ids生成菜单结构
export const generateDynamicMenu = allowIds => {
  let data = maps
  if (allowIds.length !== 0) {
    data = maps.filter(item => {
      // console.log(allows, item.pid)
      // return ~allowIds.indexOf(item.id) || ~allowIds.indexOf(item.pid)
      return ~allowIds.indexOf(item.id)
    })
  }
  return recursion(data, null)
}
