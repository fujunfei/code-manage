<template>
    <div id="customer-flow"></div>
</template>

<script>
export default {
    name: 'lineEcharts',
    props: {
        title: {
            type: Object,
            default: () => ({text: ''})
        },
        legend:{
            type: Object,
            default: () => ({data: []})
        },
        series: {
            type: Array,
            required: true,
            default: () => []
        },
        xAxis: {
            type: Object,
            default: () => {}
        }
    },
    data(){
        return {
            options: {
                yAxis: {
                    type: 'value'
                },
            }
        }
    },
    mounted(){
        this.chart = this.$echarts.init(this.$el);
        this.updateChartView();
    },
    methods: {
        updateChartView() {
            this.options = {...this.options,...this.$props}
            this.chart.setOption(this.options,true)
        }
    },
    watch: {
        $props: {
            deep: true,
            handler() {
                this.updateChartView();
            }
        }
    }
}
</script>

<style lang="less" scoped>
    #customer-flow{
        width: 100%;
        height: 100%;
        background: gray;
    }
</style>