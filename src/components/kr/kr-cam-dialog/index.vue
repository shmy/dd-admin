<template>
  <el-dialog title="摄像头拍照"
             :visible.sync="dialogVisible"
             width="400px"
             @closed="handleClose()"
             :append-to-body="true">
    <kr-cam @done="handleDone($event)" ref="cam" />
  </el-dialog>

</template>
<script>
export default {
  name: 'kr-cam-dialog',
  data: () => ({
    dialogVisible: false,
    resolve: null
  }),
  components: {
    'kr-cam': () => import('@/components/kr/kr-cam')
  },
  watch: {
    dialogVisible (v) {
      this.$nextTick(() => {
        const cam = this.$refs.cam
        v ? cam.initialize() : cam.destroy()
      })
    }
  },
  methods: {
    open () {
      this.dialogVisible = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
      })
    },
    close () {
      this.resolve = null
      this.dialogVisible = false
    },
    handleClose () {
      this.$refs.cam.reset()
    },
    handleDone (base64) {
      this.resolve && this.resolve(base64)
      this.dialogVisible = false
    }
  }
}
</script>
