import Mock from 'mockjs'

const getUserList = () => {
  return Mock.mock({
    'data|10': [{
      'name': '@cname',
      'id|+1': 1
    }]
  })
}

Mock.mock(/mock\/getList/, 'get', getUserList)

Mock.setup({
  timeout: '100-200'
})

export default Mock