export default {
  methods: {
    // 返回顶部
    backTop () {
      const container = document.querySelector('.container-component .d2-container-full__body')
      if (container) {
        container.scrollTop = 0
      }
    },
    // TODO query随机数来实现刷新
    // 打开新tab
    openTab (name, params, query) {
      this.$router.push({name, params, query})
    },
    // 关闭一个tab
    closeTab (name) {
      this.$store.commit('d2admin/page/close', {
        tagName: name,
        vm: this
      })
    },
    // 关闭当前tab
    closeCurrentTab () {
      this.$store.commit('d2admin/page/close', {
        tagName: this.$options.name, // 组件名跟路由名一致
        vm: this
      })
    }
  }
}
