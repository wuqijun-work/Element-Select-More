<template>
  <el-select v-model="value"
             v-bind="selectMixedProps"
             v-on="$listeners">
    <el-option v-for="(item, idx) in data"
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
  },
  computed: {
    isShowLoadMoreBtn: function () {
      if (this.data
        && this.data.length !== 0
        || this.data.length < this.selectProps.maxPerItemCount) {
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
  },
  mounted () { },

  methods: {
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
