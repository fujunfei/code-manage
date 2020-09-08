<template>
    <el-popconfirm
      confirmButtonText='当日'
      cancelButtonText='次日'
      icon="el-icon-info"
      iconColor="#409EFF"
      title="所添加时间为当日还是次日？"
      @onLeft="tomorrow"
      @onRight="today"
      :show="show"
    >
      <el-button slot="reference"  @click="cli">删除</el-button>
    </el-popconfirm>
</template>

<script>
export default {
    data() {
        return {
           show: false
        };
    },
    methods: {
      tomorrow() {
        console.log('tomorrow')
      },
      today() {
        console.log('today')
      },
      cli(){
        this.show == !false
      }
    }
};
</script>
