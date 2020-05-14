import Mock from 'mockjs'

const getUserList = req => {
  const { page } = JSON.parse(req.body)
  // 模拟当page为5时，返回比size小的数组
  // size 默认为10，不设置了
  console.log('page', page)
  if (page < 3) {
    return Mock.mock({
      'data|10': [{
        'name': '@cname',
        'id|+1': 1
      }]
    })
  } else if (page === 3) {
    return Mock.mock({
      'data|3': [{
        'name': '@cname',
        'id|+1': 1
      }]
    })
  } else {
    return Mock.mock({
      'data': []
    })
  }

}

Mock.mock(/mock\/getList/, 'post', getUserList)

Mock.setup({
  timeout: '100-200'
})

export default Mock