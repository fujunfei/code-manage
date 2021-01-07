<style lang="less" scoped>
    .vxe_table {
        width: 600px;
    }
</style>
<template>
    <div>
        <vxe-toolbar custom print></vxe-toolbar>
        <vxe-table
            border
            show-overflow
            highlight-hover-row
            height="300"
            class="vxe_table"
            ref="table"
            :checkbox-config="{trigger: 'row', highlight: true, range: true}"
            @checkbox-change="checkChange"
            @checkbox-range-end="checkRangeEnd"
            :sort-config="{trigger: 'cell'}"
            :data="tableData">
            <vxe-table-column type="checkbox" width="80"></vxe-table-column>
            <vxe-table-column type="seq" width="100"></vxe-table-column>
            <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
            <vxe-table-column field="sex" title="Sex"></vxe-table-column>
            <vxe-table-column field="age" title="Age"></vxe-table-column>
            <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
    </div>
</template>
<script>
export default {
    data () {
        return {
            tableData: []
        }
        },
        created () {
            new Promise((resolve, reject)=> {
                let array = []
                for (let index = 0; index < 500; index++) {
                    array.push({
                        name: `名称${index}`,
                        sex: '0',
                        num: 123,
                        age: 18,
                        num2: 234,
                        rate: 3,
                        address: 'shenzhen'
                    })
                }
                resolve(array);
            }).then((data)=>{
                this.tableData = data;
            })
            
            setTimeout(()=> {
                this.tableData[1].name = 'test';
                this.tableData = [...this.tableData]

                setTimeout(()=> {
                    this.tableData.splice(1,0,{
                        name: `newRow`,
                        sex: '0',
                        num: 123,
                        age: 18,
                        num2: 234,
                        rate: 3,
                        address: 'shenzhen'
                    })
                },2000)
            },2000)
        },
        methods: {
            checkChange({row}) {
                console.log(row)
                console.log(this.$refs.table.getRowIndex(row)) 
            },
            checkRangeEnd({records}) {
                console.log(records)
                console.log(this.$refs.table.getCheckboxRecords())
            }
        }
}
</script>