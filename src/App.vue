<template>
  <div id="app">
    <el-select-more :selectProps="selectProps"
                    :data="options"
                    :isInit="initFlag"
                    @loadMore="handleLoadMore"
                    @change="handleSelectChange" />
  </div>
</template>

<script>
import ElSelectMore from './packages/ElementSelectMore'
import { Axios } from './libs/axios'

export default {
  components: {
    ElSelectMore,
  },
  data () {
    return {
      selectProps: {
        placeholder: '请选择',
        label: 'name',
        value: 'id'
      },
      options: [],
      initFlag: false,
      params: {
        page: 1,
        size: 10
      }
    }
  },
  mounted () {
    this.fetchSelectOptions(this.params)
  },
  methods: {
    fetchSelectOptions (params) {
      Axios.post('/mock/getList', params)
        .then(res => {
          const { data } = res
          this.options = [...this.options, ...data]
        })
    },
    /**
     * 此方法内调用分页请求后台数据
     */
    handleLoadMore (current) {
      this.params.page = current
      this.fetchSelectOptions(this.params)
    },
    handleSelectChange (value) {
      console.log('change', value)
    }
  },
}
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  width: 100vw;
}
</style>
