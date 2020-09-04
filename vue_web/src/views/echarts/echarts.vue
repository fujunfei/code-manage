//大站考核
<style scoped lang="less">
    .customer-flow {
        width: 620px;
        height: 400px;
    }
</style>

<template>
    <div class="customer-flow">
        <lineChart v-bind="options"></lineChart>
    </div>   
</template>

<script>
import lineChart from "@/components/echarts/line_chart";
export default {
    components: {lineChart},
    data() {
        return {
            options: {
                title: {
                    text: '实时客流'
                },
                legend: {
                    data: ['实时', '昨天']
                },
                xAxis: {
                    type: 'category',
                    data: ['1', '2', '3', '4','5', '6', '7', '8', '9']
                },
                series: [{
                    name: '实时',
                    data: [['1', 820], ['2',932], ['3',500], ['4',901], ['5', 934], ['6',1290], ['7',1330], ['8',1320],['9',120]],
                    type: 'line',
                    smooth: true,
                    connectNulls: true
                },{
                    name: '昨天',
                    data: [['1',70],  ['4',301], ['6',190], ['7',330], ['9',320]],
                    type: 'line',
                    smooth: true,
                    connectNulls: true
                }]
            }
        };
    },
    created(){
        // let _this = this
        // setTimeout(() => {
        //     _this.options.title.text = 'ceshi';
        //     _this.options.series[0].data =  [120, 532, 201, 634, 290, 730, 1320];
        // }, 3000);
    }
};
</script>
