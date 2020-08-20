<style scoped>
    .el-menu-vertical-demo{
        height: 100%;
        width: 200px;
        float: left;
    }
</style>
<template>
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        router
        @open="handleOpen"
        @close="handleClose">
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
            </template>
            <el-menu-item index="element">全屏</el-menu-item>
            <el-menu-item index="1">待定</el-menu-item>
        </el-submenu>
        <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="fullPage" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">全屏</span>
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