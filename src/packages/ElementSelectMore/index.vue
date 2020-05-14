<template>
  <el-select v-model="value"
             v-bind="selectMixedProps"
             v-on="$listeners">
    <el-option v-for="(item, idx) in bindData"
               :key="`${item[selectMixedProps.value]}_${idx}`"
               :label="item[selectMixedProps.label]"
               :value="item[selectMixedProps.value]">
    </el-option>
    <el-option v-if="isShowLoadMoreBtn"
               value="loadMore">
      <span class="loadmore-btn"
            @click.stop.prevent="loadMore">加载更多</span>
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    selectProps: {
      type: Object,
      default: () => { },
    },
    data: {
      type: Array,
      default: () => {
        return []
      },
    },
    isInit: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isShowLoadMoreBtn: function () {
      if (this.data.length - this.prevData.length === this.selectMixedProps.maxPerItemCount) {
        return true
      } else {
        return false
      }
    },
  },
  data () {
    return {
      selectMixedProps: {
        maxPerItemCount: 10,
        placeholder: '请选择',
        value: 'value',
        label: 'label',
      },
      current: 1,
      value: '',
      bindData: [],
      prevData: []
    }
  },
  watch: {
    selectProps: {
      handler: function (newObj) {
        Object.assign(this.selectMixedProps, newObj)
      },
      deep: true,
      immediate: true,
    },
    data: {
      handler: function (newValue, oldValue) {
        this.bindData = [...newValue]
        this.prevData = [...oldValue]
      },
      deep: true
    },
    isInit: function (newValue) {
      if (newValue) {
        this.init()
      }
    }
  },
  mounted () { },

  methods: {
    init () {
      this.value = ''
      this.current = 1
      this.prevData = []
      this.bindData = []
    },
    loadMore () {
      this.$emit('loadMore', ++this.current)
    }
  },
}
</script>
<style lang="less" scoped>
.loadmore-btn {
  display: flex;
  justify-content: center;
  font-size: 12px;
}
</style>
