<template>
  <el-radio-group v-model="themeName" size="small" @change="handleChange()">
    <el-radio v-for="item of themeList" :key="item" :label="item" border>{{ item || '无' }}</el-radio>
  </el-radio-group>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'd2-transition-list',
  data: () => ({
    themeList: [
      '',
      'fade-transverse',
      'fade-scale',
      'slide-left',
      'rotate-left'
    ],
    themeName: ''
  }),
  computed: {
    ...mapState('d2admin/transition', [
      'name'
    ])
  },
  created () {
    this.themeName = this.name
  },
  methods: {
    ...mapMutations('d2admin/transition', [
      'set'
    ]),
    handleChange () {
      this.set(this.themeName)
    }
  }
}
</script>
