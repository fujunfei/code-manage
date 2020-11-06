<template>
    <div id='add'>
        <airtable
            :tableData="tableData"
            :columData="columData"
            :pageTotal="pageTotal"
            @rowContextmenu="rowContextmenu"
            @currentPageChange="currentPageChange"
            @handleSelect="handleSelect"
        >
            <template slot=date slot-scope="scope">
                <!--把所有的数据都变成插槽导出-->
                <div class="air-table-slot__div">{{scope.row.date}}</div>
            </template>
            <template slot=name slot-scope="scope">
                <!--把所有的数据都变成插槽导出-->
                <div class="air-table-slot__div">{{scope.row.name}}</div>
            </template>
            <template slot=address slot-scope="scope">
                <!--把所有的数据都变成插槽导出-->
                <div class="air-table-slot__div">{{scope.row.address}}</div>
            </template>
        </airtable>
    </div>
</template>
<script>
import airtable from "@/components/table/draggableTable.vue";
export default {
    components: {
        airtable
    },
    name: 'text-form',
    data() {
        return {
            columData:[
                {
                    name: '时间',
                    key: 'date',
                    isFixed: true,//固定列参数
                    width:"auto"
                },
                {
                    name: '名字',
                    key: 'name',
                    isFixed: true,//固定列参数
                    width:"auto"
                },
                {
                    name: '地址',
                    key: 'address',
                    isFixed: true,//固定列参数
                    width:"auto"
                },
            ],
            //table 表头字段数据
            tableData: [
                 
            ],
            //从后台获得的分页的总数
            pageTotal:100
        }
    },
    methods: {
        //鼠标右键菜单点击事件 传出来的是要做的操作和当前的列
        rowContextmenu(selectRows, row){
            console.log(selectRows);
            console.log(row);
            event.preventDefault();
            this.$contextmenu({
                items: [
                    {
                        label: "添加计划",
                        onClick: () => {},
                    }
                ],
                event,
                zIndex: 3,
                minWidth: 110,
            })
        },
        //监听当前页的变化
        currentPageChange(currentpage){
            console.log(currentpage);
        },
        //当鼠标批量编辑时或者点击鼠标选中时触发 传来的是选中的列表数据
        handleSelect(multipleSelection){
            console.log(multipleSelection)
        }
    },
    watch: {
         
    },
    created(){
        for(var i=0;i<20;i++){
            this.tableData.push({
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄dddddddddddddddddddddddddddd',
                id:i
            })
        }
    }
}
 
</script>
 
<style>
#add {
    height:100%;
    width: 800px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}
 
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}
 
.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
.mengban {
    position: fixed;
    border: 1px solid rgb(0, 119, 255);
    background-color: rgba(0, 119, 255, 0.3);
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
}
tbody{
    position: relative;
}
.air-table-slot__div {
    min-width: 200px;
    max-width: 300px;
    overflow: hidden;/*超出部分隐藏*/
    white-space: nowrap;/*不换行*/
    text-overflow:ellipsis;/*超出部分文字以...显示*/
}
</style>