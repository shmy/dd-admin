<template>
  <div class="page">
    <p class="page_title">抱歉，你暂时没有权限访问该页面</p>

    <lottie :options="defaultOptions" :height="200" :width="200" />

    <el-button class="d2-mt" @click="$router.replace({ path: '/' })">
      点击返回首页
    </el-button>
  </div>
</template>
<script>
const animationData = require('@/assets/lottie/empty_box.json')
export default {
  name: 'forbidden',
  data: () => ({
    defaultOptions: { animationData: animationData, loop: false }
  })
}
</script>
<style lang="scss" scoped>
@import '~@/assets/style/public.scss';
.page {
  background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;
  background-blend-mode: multiply,multiply;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .page_title {
    font-size: 20px;
    color: #FFF;
  }
}
</style>
