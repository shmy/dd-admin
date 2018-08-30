<template>
  <div v-show="visible" class="overlay">
    <div v-if="showClose" @click="close()" class="close-btn">
      <i class="el-icon-close"></i>
    </div>
    <slot />
  </div>
</template>
<script>
export default {
  name: 'kr-overlay',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    visible (v) {
      if (!v) {
        this.$nextTick(() => this.$emit('closed'))
      }
    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.overlay {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 2019;
  background-color: rgba(0, 0, 0, .5);
  user-select: none;
  .close-btn {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2020;
    background-color: black;
    height: 40px;
    width: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    color: white;
    border-radius: 50%;
    &:hover {
      background-color: blue;
      color: black
    }
  }
}
</style>
