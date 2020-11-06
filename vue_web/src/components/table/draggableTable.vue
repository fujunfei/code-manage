<template>
    <div class='air-table-wrapper'>
        <el-table
            ref="table"
            :show-header="true"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;"
            :header-row-class-name="headerClassName"
            :height="'500'"
            id="table"
            @row-click="rowClick"
            @row-contextmenu="rowContextmenu"
            v-drag>
            <el-table-column  :type="isType" width="55" align="center"></el-table-column>
            <!--列表的表头循环-->
            <el-table-column
                v-for="(column, index) in columData"
                :key="index"
                :label="column.name"
                :width="column.width">
                <template slot-scope="scope">
                    <!--把所有的数据都变成插槽导出-->
                    <slot :name="column.key" :row="scope.row"> </slot>
                </template>
            </el-table-column>
            <template slot=append>
                <div :class="['el-table__append-page']">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="20"
                        layout="total, prev, pager, next"
                        :total="pageTotal">
                    </el-pagination>
                </div>
            </template>
        </el-table>
    </div>
</template>
<script>
export default {
    name: 'airtable',   
    // 框选的指令
    directives: {
        drag: {
            // 指令的定义
            inserted: function (el, binding, vnode) {
                //监听用户鼠标事件
                el.onmousedown = function () {
                    //初始化不显示
                    vnode.context.toggleShow=false;  
                    //确保用户在移动鼠标的时候只初始化一次选中
                    var flag = true;
                    //用来存储列表
                    var selList = [];
                    //获得指令下的dom对应的表格
                    var fileNodes = el.getElementsByTagName("tr");    
                    // var countI = 0;
                    //获得鼠标
                    var evt = window.event || arguments[0];
                    var startX = (evt.x || evt.clientX);
                    var startY = (evt.y || evt.clientY);
                    var top,left;
                    //时时获得
                    top=getY(el);
                    left=getX(el);
                    var selDiv = document.createElement("div");
                    selDiv.style.cssText = "position:absolute;width:0px;height:0px;font-size:0px;margin:0px;padding:0px;z-index:1000;filter:alpha(opacity:60);opacity:0.6;display:none;";
                    selDiv.id = "selectDiv";
                    document.getElementsByClassName("el-table__body")[0].appendChild(selDiv);
                    selDiv.style.left = startX + "px";
                    selDiv.style.top = startY + "px";
                    var _x = null;
                    var _y = null;
                    vnode.context.clearEventBubble(evt);
                    // //打开开关
                    vnode.context.mouseflag = true;
                    // //鼠标拖动时画框
                    document.onmousemove = function () {
                        evt = window.event || arguments[0];
                        _x = (evt.x || evt.clientX);
                        _y = (evt.y || evt.clientY);
                        //为了确定是点击事件还是移动事件
                        if(Math.abs(_x - startX)<5 && Math.abs(_y - startY)<5){
                            return;
                        }
                        //为了确保只有一次的渲染每次框选都把默认选中为空
                        if(flag){
                            //重置选中css
                            for (var i = 0; i < fileNodes.length; i++) {
                                if (fileNodes[i].className.indexOf("el-table__row") != -1) {
                                    fileNodes[i].className = "el-table__row";
                                    selList.push(fileNodes[i]);
                                }
                            }     
                            vnode.context.multipleSelection=[]
                            vnode.context.tableData.forEach((ele)=>{
                                vnode.context.$refs.table.toggleRowSelection(ele,false)
                            })
                            flag = false;
                        }
                        if (vnode.context.mouseflag) {
                            if (selDiv.style.display == "none") {
                                selDiv.style.display = "";
                            }
                            var scrolling=el.getElementsByClassName("is-scrolling-none");
                            selDiv.style.left = Math.min(_x, startX)-left+scrolling[0].scrollLeft + "px";
                            //48是表头的高度
                            selDiv.style.top = Math.min(_y, startY)-top - 48+scrolling[0].scrollTop+ "px";
                            selDiv.style.width = Math.abs(_x - startX) + "px";
                            selDiv.style.height = Math.abs(_y - startY) + "px";
 
                            // ---------------- 关键算法确定列表的选中靠的是index---------------------
                            var _l = selDiv.offsetLeft, _t = selDiv.offsetTop;
                            var _w = selDiv.offsetWidth, _h = selDiv.offsetHeight;
                            for (let i = 0; i < selList.length; i++) {
                                var sl = selList[i].offsetWidth + selList[i].offsetLeft;
                                var st = selList[i].offsetHeight + selList[i].offsetTop;
                                if (sl > _l && st > _t && selList[i].offsetLeft < _l + _w && selList[i].offsetTop < _t + _h) {
                                    if (selList[i].className.indexOf("seled") == -1) {                                    
                                        selList[i].className = selList[i].className + " seled";
                                        vnode.context.$refs.table.toggleRowSelection(vnode.context.tableData[i],true)
                                        //把选中的都存入到table标签中的已选中
                                        if(vnode.context.tableData[i])
                                            vnode.context.multipleSelection.push(vnode.context.tableData[i]);
                                    }
                                } else {
                                    if (selList[i].className.indexOf("seled") != -1 ) {                                 
                                        selList[i].className = "el-table__row";
                                        vnode.context.$refs.table.toggleRowSelection(vnode.context.tableData[i],false);
                                        vnode.context.multipleSelection.forEach((ele,i)=>{
                                            //这里没用对象是否相等用的是传入table中的唯一的myKey字段
                                            if(ele[vnode.context.myKey]==vnode.context.tableData[i][vnode.context.myKey] ){
                                                vnode.context.multipleSelection.splice(i,1);
                                            }
                                        })
                                    }
                                }
                            }
 
                        }
                        vnode.context.clearEventBubble(evt);
                    };
                    //方法是确定列表到屏幕的位置
                    function getX(obj){
                        var parObj=obj;
                        var left=obj.offsetLeft;
                        while(parObj==parObj.offsetParent){
                            left+=parObj.offsetLeft;
                        }
                        return left;
                    }
                    //方法是确定列表到屏幕的位置
                    function getY(obj){
                        var parObj=obj;
                        var top=obj.offsetTop;
                        while(parObj == parObj.offsetParent){
                            top+=parObj.offsetTop;
                        }
                        return top;
                    }
                    //在鼠标抬起后做的重置
                    document.onmouseup = function () {
                        //把鼠标移动事初始化
                        document.onmousemove=null;
                        if (selDiv) {
                            document.getElementsByClassName("el-table__body")[0].removeChild(selDiv);
                        }
                        selList = null, _x = null, _y = null, selDiv = null, startX = null, startY = null, evt = null;
                        vnode.context.mouseflag = false;
                        vnode.context.$handleSelect();
                    };
                };
            }
        }
    },
    components: {
        // airContexMenu,
    },
    props: {
        //对于列表中唯一的字段myKey默认为id
        myKey: {
            type: String,
            default: "id"
        },
        //列表的数据
        tableData: {
            type: Array,
            default: () => []
        },
        //传过来的表头信息
        columData: {
            type: Array,
            default: () => []
        },
        //有没有checkbox
        isType : {
            type: String,
            default: "selection"
        },
        //分页的总页数
        pageTotal:{
            type:Number,
            default: 0
        }
    },
    data() {
        return {
            //指令中确定的时候是鼠标按下事件
            mouseflag: false,
            //选中的数组
            multipleSelection: [],
            //控制右键菜单弹出显示
            dialogVisible:false,
            //右键鼠标的位置
            position:{
                left:0,
                top:0
            },
            //控制右键显示隐藏
            toggleShow :false,
            //分页当前的页数
            currentPage:1 ,
            //当前右键点击的列
            currentRow:[],
            //当前滚动的距离，
            targetScroll:0
        }
    },
    methods: {
        //清除默认事件
        clearEventBubble(evt) {
            if (evt.stopPropagation)
                evt.stopPropagation();
            else
                evt.cancelBubble = true;
            if (evt.preventDefault)
                evt.preventDefault();
            else
                evt.returnValue = false;
        },
        //列表单击选中事件
        rowClick(row) {
            let flag=true;           
            //确定当前的row的index
            var index = 0;
            this.tableData.forEach((ele,i)=>{
                if(ele[this.myKey] == row[this.myKey]){
                    index = i+1;
                }
            })
            this.toggleShow = false;
            //如果有就移除
            this.multipleSelection.forEach((ele,i)=>{
                if(ele[this.myKey]==row[this.myKey]){
                    this.$refs.table.toggleRowSelection(row,false);
                    //后期优化吧 element的方法用不了 只能自己改变类名
                    this.$refs.table.$el.getElementsByTagName("tr")[index].className = "el-table__row";
                    this.multipleSelection.splice(i,1);
                    flag = false;
                }
            })
            //如果没有就push
            if(flag){
                this.$refs.table.toggleRowSelection(row,true);
                this.multipleSelection.push(row);
                //后期优化吧 element的方法用不了 只能自己改变类名
                this.$refs.table.$el.getElementsByTagName("tr")[index].className = "el-table__row seled";
            }       
        },
        //列表右键点击事件
        rowContextmenu(row, event){
            //为当前的row赋值
            this.currentRow = row;
            //阻止默认右键点击事件
            event.returnValue = false;
            //获取右键坐标
            this.position.left = event.clientX
            this.position.top = event.clientY
            //菜单出现的flag
            this.toggleShow = true;
            let check = this.multipleSelection.filter(i => i.id == row.id);
            if (check.length == 0) this.$refs.table.toggleRowSelection(row);
            //显示弹出窗   
            this.menuClick();
        },
        //右键菜单弹出事件
        menuClick(){
            //右键点击以后隐藏
            this.toggleShow=false;
            this.$emit("rowContextmenu",this.multipleSelection,this.currentRow)
        },
        //每页条数变化 ui定死每页20条
        handleSizeChange(val) {
            console.log(val)
            // console.log(`每页 ${val} 条`);
        },
        //当前页变化
        handleCurrentChange(val) {
            this.currentPage = val;
            this.$emit('currentPageChange',this.currentPage)
        },
        //当批量选中结束调用
        $handleSelect(){
            this.$emit('handleSelect',this.multipleSelection)
        },
        //监听表格的滚动
        handleScroll(e){
            this.targetScroll = e.target.scrollTop;         
        },
        //
        headerClassName(){
            return "air-table-header__class";
        }
    },
    computed: {
        
    },
    created() {
         
        //确保右键菜单消失
        document.onclick = ()=>{
            this.toggleShow=false;
        }
    },
    mounted() {
         
    }
}
 
</script>
 
<style lang="scss">
    // @import "../../../public/style/mixin.scss";
 
    .air-table-wrapper {
        .seled {
            background: #f5f5f5 !important;
        }
        .no-seled{
            background: #ffffff !important;
        }
        .el-table__body tr{
            cursor: pointer;
            box-sizing: border-box;
            border-top:1px solid #f5f5f5;
            border-bottom:1px solid #f5f5f5;
        }
        .air-table-header__class th{
            border-bottom:1px solid #f5f5f5 !important;
        }
        .el-table__body td{
            border-bottom:1px solid #f5f5f5;
        }
        .hover-row {
            border-top:1px solid #f5f5f5;
            border-bottom:1px solid #f5f5f5;
            background: #fafafa;
        }
        .el-table__append-page{
            padding-top:48px;
            padding-bottom:48px;
            .el-pagination{
                text-align: right;
            }
        }
        .el-table__append-info{
            position: absolute;
            bottom:0px;
            width:100%;
            .el-pagination{
                text-align: right;
            }
        }
        .air-table__context--menu{
            // box-shadow:0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
            .air-table__context--list {
                cursor: pointer;
                height: 48px;
                // @include flexCenter(flex-start,center);
                .air-table__context--icon{
                    font-size: 14px;
                    margin-left:20px;
                    color:#757575;
                }
                .air-table__context--info{
                    font-size: 14px;
                    margin-left:20px;
                    color:#212121;
                }
            }
            .air-table__context--list:hover{
                background: #f5f5f5;
            }
        }
         
         
    }
</style>