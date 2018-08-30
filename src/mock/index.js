import Mock from 'mockjs'

import '@/mock/login'
import '@/mock/drug/list'

// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
  timeout: '1000-5000'
})
