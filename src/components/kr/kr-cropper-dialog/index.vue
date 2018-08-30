<template>
  <el-dialog title="编辑图片"
             :visible.sync="dialogVisible"
             width="80%"
             @closed="handleClose()"
             :append-to-body="true">
    <div class="wrapper">
      <vue-cropper ref="cropper"
                   :img="option.image"
                   :outputSize="option.size"
                   :outputType="option.outputType"
                   :info="true"
                   :autoCrop="true"
                   :autoCropWidth="200"
                   :autoCropHeight="200"
                   :full="option.full"
                   :canMove="option.canMove"
                   :canMoveBox="option.canMoveBox"
                   :fixedBox="option.fixedBox"
                   :original="option.original" />
    </div>
    <span slot="footer">
      <ul class="tool-bar">
        <li>
          <el-button type="primary"
                     :icon="`${scopedIconName}iconset0158`"
                     size="small"
                     @click="$refs.cropper.changeScale(1)"
                     circle></el-button>
        </li>
        <li>
          <el-button type="primary"
                     :icon="`${scopedIconName}iconset0159`"
                     size="small"
                     @click="$refs.cropper.changeScale(-1)"
                     circle></el-button>
        </li>
        <li>
          <el-button type="primary"
                     :icon="`${scopedIconName}zuoxuanzhuan`"
                     size="small"
                     @click="$refs.cropper.rotateLeft()"
                     circle></el-button>
        </li>
        <li>
          <el-button type="primary"
                     :icon="`${scopedIconName}youxuanzhuan`"
                     size="small"
                     @click="$refs.cropper.rotateRight()"
                     circle></el-button>
        </li>
      </ul>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary"
                 @click="finish()">确 定</el-button>
    </span>
  </el-dialog>

</template>
<script>
export default {
  name: 'kr-cropper-dialog',
  data: () => ({
    scopedIconName: 'kr-cropper-dialog-iconfont icon-',
    resolve: null,
    dialogVisible: false,
    option: {
      image: '',
      size: 1,
      full: false,
      outputType: 'png',
      canMove: true,
      fixedBox: false,
      original: false,
      canMoveBox: false
    }
  }),
  components: {
    'vue-cropper': () => import('vue-cropper')
  },
  props: {
    image: {
      type: String,
      default: ''
    }
  },
  methods: {
    open (url) {
      this.option.image = url
      this.dialogVisible = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
      })
    },
    close () {
      this.dialogVisible = false
    },
    handleClose () {
      this.option.url = ''
    },
    finish () {
      this.$refs.cropper.getCropData(base64 => {
        this.resolve && this.resolve(base64)
        this.dialogVisible = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import url('./icon/iconfont.css');
.wrapper {
  height: 500px;
}
.tool-bar {
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    float: left;
    margin-right: 10px;
  }
}
</style>
