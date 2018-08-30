// nprogress
import 'nprogress/nprogress.css'
import '@/assets/iconfont/iconfont.css'
import '@/assets/font-awesome-4.7.0/css/font-awesome.min.css'
// Vue
import Vue from 'vue'
import App from './App'
// store
import store from '@/store/index'

// 核心插件
import d2Admin from '@/plugin/d2admin'
import vueKeepScrollPlugin from 'vue-keep-scroll-plugin' // 保持滚动条位置
import vueLottie from 'vue-lottie' // 动画
// 菜单和路由设置
import generateRouting from './router'
import { generateDynamicRouting, generateDynamicMenu } from '@/router/dynamic-routes'

// 科瑞插件
// import krCam from '@/plugin/kr/kr-cam'
// import krCropper from '@/plugin/kr/kr-cropper'
// import krViewer from '@/plugin/kr/kr-viewer'

// http
// import { http } from '@/libs/axios'

// 核心插件
Vue.use(d2Admin)
Vue.use(vueKeepScrollPlugin)
// Vue.use(krCam)
// Vue.use(krCropper)
// Vue.use(krViewer)

// 注册科瑞插件
// Vue.component(krIcon.name, krIcon)

// lottie 动画
Vue.component('lottie', vueLottie)

// if (process.env.NODE_ENV === 'production') {
bootstrap()
// } else {
//   // 开发环境才加载 mock
//   import('@/mock').then(bootstrap)
// }

function getDepthPath (o) {
  if (o.path) return o.path
  if (o.children && o.children.length > 0) {
    if (!o.children[0].path) return getDepthPath(o.children[0])
    return o.children[0].path
  }
  return '/forbidden'
}
function bootstrap () {
  setTimeout(() => {
    // http.get('http://www.baidu.com').catch(() => {})
    // TODO 判断是否已登录 服务器错误==
    // console.log('模拟请求菜单成功后再进入')
    const data = [1, 2, 3] // 模拟后台返回的所有可用路由id
    const frameInRoutes = generateDynamicRouting(data) // 获取routes
    const allMenus = generateDynamicMenu(data) // 获取menus
    const menuAside = allMenus.map(item => ({
      path: getDepthPath(item),
      title: item.title,
      icon: item.icon,
      children: item.children || []
    }))
    const menuHeader = menuAside.map(item => ({
      path: getDepthPath(item),
      title: item.title,
      icon: item.icon
    }))

    const router = generateRouting(frameInRoutes)

    window.__THIS_VUE_APP__ = new Vue({
      router,
      store,
      render: h => {
        // 保存createElememt
        window.h = h
        return h(App)
      },
      created () {
        // 初始化
        this.$store.commit('d2admin/page/init', frameInRoutes)
        // 设置顶栏菜单
        this.$store.commit('d2admin/menu/headerSet', menuHeader)
        // 设置侧边栏菜单
        this.$store.commit('d2admin/menu/asideSet', menuAside)
        // 展示系统信息
        this.$store.commit('d2admin/releases/versionShow')
        // 检查最新版本
        // this.$store.dispatch('d2admin/releases/checkUpdate')
        // 用户登陆后从数据库加载一系列的设置
        this.$store.commit('d2admin/account/load')
        // 获取并记录用户 UA
        this.$store.commit('d2admin/ua/get')
        // 初始化全屏监听
        this.$store.commit('d2admin/fullscreen/listen')
      },
      watch: {
        // 监听路由 控制侧边栏显示
        '$route.matched' (val) {
          let path = val[val.length - 1].path
          this.matchSideItem(path)
        }
      },
      methods: {
        /**
         * 自动匹配左侧栏目
         */
        matchSideItem (path) {
          if (!path) {
            path = this.$route.path
          }
          path = this.getModule(path)
          const _side = menuAside.filter(menu => this.getModule(menu.path) === path)
          if (_side.length !== 0) {
            this.$store.commit('d2admin/menu/asideSet', _side.length > 0 ? _side[0].children : [])
          }
        },
        /**
         * 根据路径获取模块
         */
        getModule (path) {
          if (!path) return ''
          let matched = path.match(/(^\/[a-z0-9]+)/)
          if (!matched) return ''
          return matched[0]
        }
      }
    })
    window.__THIS_VUE_APP__.$mount('#app')
  }, 1)
}
