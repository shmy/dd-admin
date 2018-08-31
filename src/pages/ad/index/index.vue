<template>
  <d2-container>
    <el-form ref="form"
             :model="form"
             label-width="80px">
      <el-form-item label="广告名称">
        <el-input size="small"
                  v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="广告类型"
                    :model="form"
                    label-width="80px">
        <el-select size="small"
                   @change="handleChange()"
                   v-model="form.type"
                   placeholder="请选择广告类型">
          <el-option v-for="item of typeOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="label">
        <el-input ref="dataInput" :placeholder="`请输入${label}`"
                  size="small"
                  v-model="form.data">
        </el-input>
      </el-form-item>
    </el-form>
  </d2-container>
</template>
<script>
export default {
  data: () => ({
    typeOptions: [
      { label: '打开WebView', value: 'webview' },
      { label: '打开自带浏览器', value: 'browser' },
      { label: '弹出提示框', value: 'alert' },
      { label: '打开播单详情', value: 'series' },
      { label: '打开视频详情', value: 'video' },
      { label: '打开支付宝领取口令红包', value: 'alipay_readpack' }
    ],
    form: {
      name: '',
      type: 'webview',
      data: ''
    }
  }),
  computed: {
    label () {
      if (~['webview', 'browser'].indexOf(this.form.type)) return '跳转地址'
      if (this.form.type === 'alert') return '弹出内容'
      if (this.form.type === 'series') return '播单ID'
      if (this.form.type === 'video') return '视频ID'
      if (this.form.type === 'alipay_readpack') return '红包口令'
    }
  },
  methods: {
    handleChange () {
      this.form.data = ''
      this.$nextTick(() => {
        this.$refs.dataInput.focus()
      })
    }
  }
}
</script>
