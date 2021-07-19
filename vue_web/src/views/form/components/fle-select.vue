<template>
  <el-select v-model="item.tbl_val" @change="change" placeholder="请选择活动区域">
    <el-option label="区域一" value="shanghai"></el-option>
    <el-option label="区域二" value="beijing"></el-option>
  </el-select>
</template>
<script>
export default {
  props: {
    item: {
      required: true,
      default: {}
    }
  },
  methods: {
    change() {
      this.$emit('change', this.item)
    }
  }
}
</script>