// import axios from 'axios'
// import semver from 'semver'
import util from '@/libs/util.js'
// import setting from '@/setting.js'
/* eslint-disable standard/object-curly-even-spacing */
const { NAME, VERSION, BUILD_AT, SUPPORT_NAME, SUPPORT_URL} = window.__SITE_CONFIG

export default {
  namespaced: true,
  state: {
    // D2Admin 版本
    version: VERSION,
    // 最新版本的信息
    latest: {},
    // 有新版本
    update: false
  },
  actions: {
    /**
     * @description 检查版本更新
     * @param {Object} param context
     */
    // checkUpdate ({ state, commit }) {
    //   axios.get(setting.releases.api)
    //     .then(res => {
    //       let versionGet = res.tag_name
    //       const update = semver.lt(state.version, versionGet)
    //       if (update) {
    //         util.log.capsule(window.__SITE_CONFIG.NAME, `New version ${res.name}`)
    //         console.log(`版本号: ${res.tag_name} | 详情 ${res.html_url}`)
    //         commit('updateSet', true)
    //       }
    //       commit('latestSet', res)
    //     })
    //     .catch(err => {
    //       console.log('checkUpdate error', err)
    //     })
    // }
  },
  mutations: {
    /**
     * @description 显示版本信息
     * @param {Object} state vuex state
     */
    versionShow (state) {
      util.log.capsule(NAME, `v${VERSION}`, BUILD_AT)
      util.log.success(`${SUPPORT_NAME} ${SUPPORT_URL}`)
    }
    /**
     * @description 设置是否有新的 D2Admin 版本
     * @param {Object} state vuex state
     * @param {Boolean} update can update
     */
    // updateSet (state, update) {
    //   // store 赋值
    //   state.update = update
    // },
    // /**
    //  * @description 设置最新版本的信息
    //  * @param {Object} state vuex state
    //  * @param {Object}} latest releases value
    //  */
    // latestSet (state, latest) {
    //   // store 赋值
    //   state.latest = latest
    // }
  }
}
