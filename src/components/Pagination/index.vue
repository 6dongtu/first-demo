<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startAndEnd.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo === 1 }"
    >
      1
    </button>
    <button v-if="startAndEnd.start > 2">···</button>

    <button
      v-for="(start, index) in startAndEnd.end"
      :key="index"
      v-show="start >= startAndEnd.start"
      @click="$emit('getPageNo', start)"
      :class="{active:pageNo===start}"
    >
      {{ start }}
    </button>

    <button v-if="startAndEnd.end < totalPage - 1">···</button>
    <button
      v-if="startAndEnd.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{active:pageNo===totalPage}"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo === totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //计算总页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //计算连续的页码起始数字和结束数字
    startAndEnd() {
      // const {continues,pageNo,totalPage} = this  //解构
      // 定义两个变量存储起始数字和结束数字
      let start = 0;
      let end = 0;
      // 不正常现象[总页数没有连续页数多]
      if (this.continues > this.totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        start = this.pageNo - parseInt(this.continues / 2);
        end = this.pageNo + parseInt(this.continues / 2);
        // 不正常现象[起始数字小于1]
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        // 不正常现象[结束数字大于总页数]
        if (end > this.totalPage) {
          end = this.totalPage;
          start = this.totalPage - this.continues + 1;
        }
      }
      return { start, end };
    },
  },
  methods: {
    // 上一页
    handlePrev() {
      // 判断是否是第一页
      if (this.pageNo === 1) {
        return;
      }
      this.$emit("getPageNo", this.pageNo - 1);
    },
    // 下一页
    handleNext() {},
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
