import Mock from 'mockjs'

Mock.mock(/^\/drug\/list/, 'get', ({url, type, body}) => {
  console.log(url, type, body)
  const data = Mock.mock({
    'd|20': [
      {
        'id|+1': 1,
        name: '@cname'
      }
    ]
  }).d
  return {
    code: 0,
    msg: 'ok',
    data: data
  }
})
