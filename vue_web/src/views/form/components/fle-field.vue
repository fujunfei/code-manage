<template>
  <el-input v-model="item.tbl_val"></el-input>
</template>
<script>
export default {
  props: {
    item: {
      required: true,
      default: {}
    }
  }
}
</script>