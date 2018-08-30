<template>
  <el-menu :default-active="path"
           mode="horizontal"
           @select="handleMenuSelect">
    <template v-for="(menu, menuIndex) in header">
      <d2-layout-header-aside-menu-item v-if="menu.children === undefined"
                                        :menu="menu"
                                        :key="menuIndex" />
      <d2-layout-header-aside-menu-sub v-else
                                       :menu="menu"
                                       :key="menuIndex" />
    </template>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
import menuMixin from '../mixin/menu'
import d2LayoutMainMenuItem from '../components/menu-item/index.vue'
import d2LayoutMainMenuSub from '../components/menu-sub/index.vue'
export default {
  name: 'd2-layout-header-aside-menu-header',
  mixins: [menuMixin],
  components: {
    'd2-layout-header-aside-menu-item': d2LayoutMainMenuItem,
    'd2-layout-header-aside-menu-sub': d2LayoutMainMenuSub
  },
  computed: {
    ...mapState('d2admin/menu', ['header']),
    path () {
      let matched = this.$route.path.match(/(^\/[a-z0-9]+)/)
      if (!matched) return ''
      // 匹配header
      for (let i = 0, j = this.header.length; i < j; i++) {
        if (new RegExp(`^${matched[0]}`).test(this.header[i].path)) {
          return this.header[i].path
        }
      }
      return ''
    }
  }
}
</script>
