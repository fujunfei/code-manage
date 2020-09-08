<template>
    <popConfirm
        confirmButtonText='当日'
        cancelButtonText='次日'
        icon="el-icon-info"
        iconColor="#409EFF"
        title="所添加时间为当日还是次日？"
        @onLeft="tomorrow"
        @onRight="today"
        :show.sync="kuaTshow">
        <el-button slot="reference"  @click="changeBlur">按钮</el-button>
    </popConfirm> 
</template>
<script>

// import ElMenu from 'element-ui/packages/menu'
import popConfirm from '@/components/popconfirm'
export default {
    name: 'elementDev',
    components: {popConfirm},
    data(){
        return {
            kuaTshow: false,
        }
    },
    methods: {
        tomorrow(){},
        today(){},
        changeBlur() {
            this.kuaTshow = !false
        },
    }
}
</script>
<style scoped>
    .ele{
        width: calc(100% - 200px);
    }
</style>