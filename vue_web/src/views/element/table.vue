<style lang="less" scoped>
.table{
  display: flex;
  justify-content: space-around;
  >span{
    display: inline-block;
  }
}
</style>
<template>
    <div style="width:600px">
        <h3 style="padding:20px">table组件是从element-ui-fujf按需引入的， 配置dragIndex 支持表格的整行拖拽、单元格上下拖拽</h3>
        <el-table
        :data="tableData"
        @row-contextmenu="rowContextmenu"
        :dragIndex="dragIndex"
        @dragStart='dragStart'
        @dragLeave='dragLeave'
        :height="'500'"
        ref="multipleTable"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
            prop="date"
            label="日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
        </el-table>
        <!-- <div style="height:500px;overflow:scroll">
          <div v-for="item in tableData" :key="item.id" style="width:500px;height:40px" class="table">
            <el-checkbox v-model="item.checked"></el-checkbox>
            <span>{{item.date}}</span>
            <span>{{item.name}}</span>
            <span>{{item.address}}</span>
          </div>
        </div> -->
    </div>
</template>

<script>
    export default {
      data() {
        return {
          tableData: [],
          start: '',
          end: '',
          dragColumn: '',
          timer: null,
          dragIndex: ['name', 'address']
        }
      },
      methods: {
         rowContextmenu(item,row){
            console.log(item,row);
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
        dragStart(row, column) {
          this.start = JSON.parse(JSON.stringify(row));
          this.dragColumn = column.property;
        },
        dragLeave(row) {
          this.end = JSON.parse(JSON.stringify(row));
          if (this.timer) {
            clearTimeout(this.timer);
          }
          this.timer = setTimeout(() => {
            this.timer = null;
            this.fn();
          }, 300);
        },
        fn() {
          let start = this.tableData.findIndex(i => i[this.dragColumn] == this.start[this.dragColumn]);
          let end = this.tableData.findIndex(i => i[this.dragColumn] == this.end[this.dragColumn]);
          // 整行拖动
          // [this.tableData[start], this.tableData[end]] = [this.tableData[end], this.tableData[start]];
          // 单元拖动
          this.tableData[start][this.dragColumn] = this.end[this.dragColumn];
          this.tableData[end][this.dragColumn] = this.start[this.dragColumn];
          this.tableData = [...this.tableData];
        }
      },
      created(){
        for(var i=0;i<20;i++){
            this.tableData.push({
                date: '2016-05-03',
                name: '王小虎'+i,
                address: '上海市普陀区金沙江路 1518 弄dddddddddddddddddddddddddddd',
                id:i
            })
        }
    }
    }
  </script>