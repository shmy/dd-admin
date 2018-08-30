<template>
  <div>
    <el-tooltip effect="dark" content="主题与过渡" placement="bottom">
      <el-button class="d2-ml-0 d2-mr btn-text can-hover" type="text" @click="dialogVisible = true">
        <d2-icon name="diamond" style="font-size: 16px"/>
      </el-button>
    </el-tooltip>
    <el-dialog title="主题" width="600px" :visible.sync="dialogVisible" :append-to-body="true">
      <d2-theme-list style="margin-top: -25px;"/>
      <h3>过渡效果</h3>
      <d2-transition-list />
    </el-dialog>
  </div>
</template>

<script>
import themeList from './components/d2-theme-list'
import transitionList from './components/d2-transition-list'
export default {
  components: {
    'd2-theme-list': themeList,
    'd2-transition-list': transitionList
  },
  data () {
    return {
      dialogVisible: false
    }
  }
}
</script>
