// import serverModule from './modules/server'
// import policeModule from './modules/police'

import menus from './map'
// 菜单 侧边栏
// export default [
//   serverModule,
//   policeModule

// ]

export default menus.map(item => ({
  path: item.children[0].path, title: item.title, icon: item.icon, children: item.children
}))
