<template>
  <kr-overlay :visible.sync="dialogVisible" @closed="handleColosed()">
    <div class="wrapper">
      <div class="body">
        <img :style="style"
             @mousedown.prevent="handleMouseDown($event)"
             class="main-image"
             :src="currentSrc"
             alt="">
      </div>
      <div class="footer">
        <el-button type="info"
                   :icon="`${scopedIconName}iconset0158`"
                   size="small"
                   @click="changeScale(1)"
                   circle>
        </el-button>
        <el-button type="info"
                   :icon="`${scopedIconName}iconset0159`"
                   size="small"
                   @click="changeScale(-1)"
                   circle>
        </el-button>
        <el-button type="info"
                   :icon="`${scopedIconName}zuoxuanzhuan`"
                   size="small"
                   @click="changeRotate(1)"
                   circle>
        </el-button>
        <el-button type="info"
                   :icon="`${scopedIconName}youxuanzhuan`"
                   size="small"
                   @click="changeRotate(-1)"
                   circle>
        </el-button>
        <el-button type="info"
                   :icon="`${scopedIconName}fenxihuanyuan`"
                   size="small"
                   @click="reset()"
                   circle>
        </el-button>
        <el-button type="info"
                   :icon="`${scopedIconName}xiazai`"
                   size="small"
                   @click="download()"
                   circle>
        </el-button>
      </div>
    </div>
  </kr-overlay>
</template>
<script>
const loadingImage = require('./img/loading.gif')
const loaderrImage = require('./img/loaderr.png')
export default {
  components: {
    'kr-overlay': () => import('@/components/kr/kr-overlay')
  },
  name: 'kr-viewer',
  data: () => ({
    scopedIconName: 'kr-viewer-iconfont icon-',
    dialogVisible: false,
    currentSrc: '',
    name: '',
    img: null,
    isDown: false,
    top: 0,
    left: 0,
    transform: {
      scale: 1,
      rotate: 0
    }
  }),
  computed: {
    style () {
      const { scale, rotate } = this.transform
      return {
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        transition: this.isDown ? 'none' : '0.3s',
        top: this.top + 'px',
        left: this.left + 'px'
      }
    }
  },
  methods: {
    open (url, name) {
      this.name = ''
      this.load(url)
      this.dialogVisible = true
    },
    close () {
      this.dialogVisible = false
    },
    changeScale (flag) {
      this.transform.scale += flag > 0 ? 0.1 : -0.1
    },
    changeRotate (flag) {
      this.transform.rotate += flag > 0 ? 90 : -90
    },
    load (url) {
      this.setLoading()
      this.img = new Image()
      this.img.addEventListener('load', e => {
        this.currentSrc = url
        this.left = window.innerWidth / 2 - this.img.width / 2
        this.top = window.innerHeight / 2 - this.img.height / 2
      })
      this.img.addEventListener('error', e => {
        this.setLoadError()
      })
      this.img.src = url
    },
    reset () {
      this.transform = {
        scale: 1,
        rotate: 0
      }
      if (this.img) {
        this.left = window.innerWidth / 2 - this.img.width / 2
        this.top = window.innerHeight / 2 - this.img.height / 2
      } else {
        this.left = 0
        this.top = 0
      }
    },
    handleColosed () {
      this.reset()
      this.img = null
      this.currentSrc = ''
    },
    setLoading () {
      this.currentSrc = loadingImage
      this.left = window.innerWidth / 2 - 32 / 2
      this.top = window.innerHeight / 2 - 32 / 2
    },
    setLoadError () {
      this.currentSrc = loaderrImage
      this.left = window.innerWidth / 2 - 220 / 2
      this.top = window.innerHeight / 2 - 220 / 2
    },
    download () {
      if (this.currentSrc) {
        window.open(this.currentSrc)
      }
    },
    handleMouseDown (ev) {
      this.isDown = true
      const oDiv = ev.target
      const disX = ev.pageX - oDiv.offsetLeft
      const disY = ev.pageY - oDiv.offsetTop
      document.onmousemove = ev => {
        const l = ev.pageX - disX
        const t = ev.pageY - disY
        this.left = l
        this.top = t
      }
      document.onmouseup = () => {
        this.isDown = false
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import url("./icon/iconfont.css");
.wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .body {
    flex: 1;
    height: 0;
    .main-image {
      position: relative;
      cursor: move;
    }
  }
  .footer {
    height: 60px;
    line-height: 60px;
    width: 100%;
    text-align: center;
    // background-color: red;
  }
}
</style>
