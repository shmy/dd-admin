import validator from 'validator'
// https://github.com/chriso/validator.js

// 扩展身份证号码验证
validator.extend('isIdCode', value => /(^\d{15}$)|(^\d{17}(\d|X)$)/.test(value))
// 扩展中文名验证
validator.extend('isZhName', value => /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z]){2,8}$/.test(value))

export default validator
