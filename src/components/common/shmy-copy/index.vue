<template>
  <span class="copy-el" @click="handleCopy()">
    <i class="el-icon-document"></i>
  </span>
</template>
<script>
import clipboard from 'clipboard-polyfill'
export default {
  name: 'shmy-copy',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleCopy () {
      clipboard.writeText(this.text)
      this.$message.success(this.text + ' 复制成功')
    }
  }
}
</script>
<style lang="scss" scoped>
.copy-el {
  margin-left: 10px;
  cursor: pointer;
}
</style>
