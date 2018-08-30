import util from '@/libs/util'

export default {
  install (Vue) {
    Vue.prototype.$open = util.open
  }
}
