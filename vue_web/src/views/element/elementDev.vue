<template>
    <div style="width:500px">
        <h3 style="padding:20px">自定义事件触发弹出提示框</h3>
        <popConfirm
            confirmButtonText='当日'
            cancelButtonText='次日'
            icon="el-icon-info"
            iconColor="#409EFF"
            title="所添加时间为当日还是次日？"
            @onLeft="tomorrow"
            @onRight="today"
            :show.sync="kuaTshow">
            <el-input slot="reference" v-model="input" placeholder="失去焦点触发" @blur="changeBlur"></el-input>
        </popConfirm> 
    </div>
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
            input: ''
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