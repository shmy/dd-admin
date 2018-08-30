import menus from './map'
// 菜单 顶栏
// export default [
//   { path: '/server', title: '社区管理', icon: 'home' },
//   { path: '/police', title: '公安管理', icon: 'home' }
// ]

export default menus.map(item => ({
  path: item.children[0].path, title: item.title, icon: item.icon
}))
