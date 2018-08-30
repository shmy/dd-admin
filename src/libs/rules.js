import validator from './validator'

// element-ui 自定义表单验证规则
export default {
  // 身份证号码验证
  isIdCode: (rule, value, callback) => {
    const name = '身份证号码'
    if (value === '') throw new Error(`请输入${name}`)
    if (validator.isIdCode(value)) throw new Error(`${name}格式不正确`)
    callback()
  },
  // 手机号码验证
  isMobilePhone: (rule, value, callback) => {
    const name = '手机号码'
    if (value === '') throw new Error(`请输入${name}`)
    // const MobileRule = /^(?=\d{11}$)^1(?:(?:3(?!49)[4-9\D]|47|5[012789]|78|8[23478]|98)\d{8}$|(?:70[356])\d{7}$)/
    // const UnicomRule = /^(?=\d{11}$)^1(?:(?:3[0-2]|45|5[56]|66|7[156]|8[56])\d{8}$|(?:70[4789])\d{7}$)/
    // const TelecomRule = /^(?=\d{11}$)^1(?:(?:33|49|53|7[37]|8[019]|99)\d{8}$|(?:349|70[0-2])\d{7}$)/
    if (validator.isMobilePhone(value, ['zh-CN'])) throw new Error(`${name}格式不正确`)
    callback()
  },
  // 中文名称验证
  isZhName: (rule, value, callback) => {
    const name = '姓名'
    if (value === '') throw new Error(`请输入${name}`)
    if (!validator.isZhName(value)) throw new Error(`${name}格式不正确`)
    callback()
  }

}
