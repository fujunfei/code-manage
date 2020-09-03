<template>
  <div class="chart"></div>
</template>

<script>
import echart from 'echarts';
export default {
    name:'pie',
    props: {
        seriesData: {
            type: Array,
            required: true,
            default: () => []
        },
        extraOption: {
            type: Object,
            default: () => ({})
        },
        data() {
            return {
                chart: null 
            };
        },
        mounted() {
            this.chart = echart.init(this.$el);
            this.updateChartView();
        },
        methods: {
            updateChartView() {
                if (!this.chart) return;
                this.chart.setOption(this.assembleDataToOption(), true);
            },
            assembleDataToOption() {
                // const formatter = name => {
                //     const total = this.seriesData.reduce((acc, cur) => acc + cur.value, 0);
                //     const data = this.seriesData.find(item => item.name === name) || {};
                //     const percent = data.value
                //     ? `${Math.round((data.value / total) * 100)}%`
                //     : '0%';

                //     return `{a|${name}}{b|${percent}}`;
                // };

                // return {
                //     legend: { formatter },

                // }
                //     { color: COLOR_ARRAY },
                //     {
                    
                //     series: [{ data: this.seriesData }]
                //     },
                //     this.extraOption
                // );
            },
        }
    },
}
</script>

<style lang="less" scoped>
    .chart {
        width: 100%;
        height: 100%;
    }
</style>