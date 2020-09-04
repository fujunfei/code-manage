<template>
    <line-echarts v-if="!isEmpty" v-bind="$props" />
    <div class='empty' v-else>暂无统计数据</div>
</template>

<script>
import lineEcharts from './lineEcharts'
export default {
    name: 'lineChart',
    components: {lineEcharts},
    props: lineEcharts.props,
    computed: {
        isEmpty() {
            if (this.series.length == 0) return true;
            return this.series.every(i => (!i.data || i.data.length == 0))
        }
    }
}
</script>

<style lang="less" scoped>
    .empty{
        height:100%;
        width:100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>