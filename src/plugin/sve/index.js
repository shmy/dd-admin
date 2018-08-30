import sve from '@/service'

export default {
  install (Vue) {
    Vue.prototype.$sve = sve
  }
}
