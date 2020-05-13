<template>
  <div id="app">
    <el-select-more :selectProps="selectProps"
                    :data="options"
                    @loadMore="handleLoadMore" />
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
    }
  },
  mounted () {
    this.fetchSelectOptions()
  },
  methods: {
    fetchSelectOptions () {
      Axios.get('/mock/getList')
        .then(res => {
          const { data } = res
          this.options = [...this.options, ...data]
        })
    },
    handleLoadMore (current) {
      console.log(current)
      this.fetchSelectOptions()
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
