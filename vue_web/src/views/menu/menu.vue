<style scoped lang="less">
    .el-menu-vertical-demo{
        height: 100%;
        width: 200px;
        float: left;
        box-sizing: border-box;
        li {
            width: 200px;
            margin: 0 0px;
        }
    }
</style>
<template>
    <el-menu
        class="el-menu-vertical-demo"
        router
        @open="handleOpen"
        @close="handleClose">
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
            </template>
            <el-menu-item index="element-dev">element-ui二次开发</el-menu-item>
            <el-menu-item index="echarts">echarts</el-menu-item>
        </el-submenu>
        <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="fullPage">
            <i class="el-icon-document"></i>
            <span slot="title">全屏三</span>
        </el-menu-item>
    </el-menu>
</template>
<script>
export default {
    name: 'Menus',
    methods: {
        handleOpen(){},
        handleClose(){}
    }
}
</script>