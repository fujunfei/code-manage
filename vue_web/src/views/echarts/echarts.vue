<template>
    <div class='echart-wrapper'>
        <echart-pie></echart-pie>
    </div>
</template>
<script>
import echartPie from '@/components/echarts/echartsPie';
export default {
    name: 'echarts',
    components: {echartPie},
    data() {
        return{
            
        }
    },
    methods: {
    }
}
</script>
<style lang="less" scoped>
    .echart-wrapper{
        width: 300px;
        height: 300px;
        margin: 10px auto;
    }
</style>