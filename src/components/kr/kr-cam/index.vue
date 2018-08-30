<template>
  <div class="cam-panel">
    <video ref="video"></video>
    <div class="tip"
         v-show="!isLoaded && !isNoPermission">加载摄像头中...</div>
    <div class="tip"
         v-show="isNoPermission">没有摄像头或未授予权限...</div>
    <div class="tool"
         v-show="isLoaded">
      <div v-show="isWaitDone"
           class="cancel"
           @click="doCancel()">
        <i class="el-icon-close"></i>
      </div>
      <div v-show="!isWaitDone"
           class="cam"
           @click="doCam()"></div>
      <div v-show="isWaitDone"
           class="done"
           @click="doDone()">
        <i class="el-icon-check"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'kr-cam',
  data: () => ({
    isLoaded: false,
    isNoPermission: false,
    isWaitDone: false,
    mediaStreamTrack: null
  }),
  methods: {
    initialize () {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: false
          })
          .then(stream => {
            this.mediaStreamTrack =
              typeof stream.stop === 'function'
                ? stream
                : stream.getTracks()[0]
            this.isLoaded = true
            this.$refs.video.srcObject = stream
            this.$refs.video.play()
          })
          .catch(err => {
            // TODO 权限处理 无摄像头处理
            this.isNoPermission = true
            console.log(err)
          })
      }
    },
    destroy () {
      this.mediaStreamTrack && this.mediaStreamTrack.stop()
    },
    reset () {
      this.$refs.video.srcObject = null
      this.isLoaded = false
      this.isNoPermission = false
      this.isWaitDone = false
      this.mediaStreamTrack = null
    },
    doCam () {
      this.$refs.video.pause()
      this.isWaitDone = true
    },
    doCancel () {
      this.$refs.video.play()
      this.isWaitDone = false
    },
    doDone () {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      context.drawImage(this.$refs.video, 0, 0, 200, 150)
      this.$emit('done', canvas.toDataURL('image/png'))
      // this.doCancel()
    }
  }
}
</script>
<style lang="scss" scoped>
.cam-panel {
  height: 440px;
  width: 100%;
  position: relative;
  video {
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: fill;
  }
  .tip {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    margin-top: 60px;
  }
  .tool {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 9;
    text-align: center;
    .cam,
    .cancel,
    .done {
      height: 40px;
      line-height: 44px;
      width: 40px;
      margin-top: -20px;
      margin-left: -20px;
      position: absolute;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      background-color: red;
      cursor: pointer;
      i {
        font-size: 20px;
        font-weight: bold;
      }
    }
    .cancel {
      margin-left: -100px;
      background-color: gray;
      i {
        color: black
      }
    }
    .done {
      margin-left: 60px;
      background-color: green;
      i {
        color: white
      }
    }
  }
}
</style>
