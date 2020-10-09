<template>
    <div style="width:600px">
        <h3 style="padding:20px">table组件是从element-ui-fujf按需引入的， 配置dragIndex 支持表格的整行拖拽、单元格上下拖拽</h3>
        <el-table
        :data="tableData"
        :dragIndex="dragIndex"
        @dragStart='dragStart'
        @dragLeave='dragLeave'
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
    </div>
</template>

<script>
    export default {
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎3',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎4',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
          start: '',
          end: '',
          dragColumn: '',
          timer: null,
          dragIndex: ['name', 'address']
        }
      },
      methods: {
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
      }
    }
  </script>