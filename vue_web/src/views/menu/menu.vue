<style scoped lang="less">
    .el-menu-vertical-demo{
        height: 100%;
        width: 200px;
        float: left;
        box-sizing: border-box;
        background: var(--theme-color);
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
            <el-menu-item index="element-dev">popConfirm</el-menu-item>
            <el-menu-item index="table-drag">el-table表格拖拽</el-menu-item>
            <el-menu-item index="table-drag-select">el-table表格拖拉框选</el-menu-item>
            <el-menu-item index="ag-grid">ag-grid</el-menu-item>
            <el-menu-item index="vxe-table">vxe-table</el-menu-item>
            <el-menu-item index="echarts">echarts</el-menu-item>
        </el-submenu>
        <el-menu-item index="formConfig">
            <i class="el-icon-menu"></i>
            <span slot="title">表单可配置</span>
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