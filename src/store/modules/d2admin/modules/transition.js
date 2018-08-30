// 设置文件
import setting from '@/setting.js'

export default {
  namespaced: true,
  state: {
    // 是否开启页面过度动画
    name: setting.transition.name
  },
  mutations: {
    /**
     * @description 设置开启状态
     * @param {Object} state vuex state
     * @param {Boolean} active 新的状态
     */
    set (state, name) {
      // store 赋值
      state.name = name
      // 持久化
      this.dispatch('d2admin/db/set', {
        dbName: 'sys',
        path: 'transition.name',
        value: state.name,
        user: true
      })
    },
    /**
     * 从数据库读取页面过渡动画设置
     * @param {Object} state vuex state
     */
    async load (state) {
      // store 赋值
      state.name = await this.dispatch('d2admin/db/get', {
        dbName: 'sys',
        path: 'transition.name',
        defaultValue: setting.transition.name,
        user: true
      })
    }
  }
}
