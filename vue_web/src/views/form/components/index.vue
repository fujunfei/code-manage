<template>
<div>
  <el-form 
    ref="ruleForm" 
    class="content-form" 
    :model="ruleForm"
    :label-width="block ? '' : '80px'"
  >
    <!-- item.is_required 控制表单必填性 -->
    <!-- item.trans_key 表单名称 -->
    <el-form-item 
      v-for="pItem in formData.filter(i => i.display)"
      :prop="pItem.children.length===0 ? pItem.tbl: ''"
      :key="pItem.id" 
      :label="pItem.trans_key"
      :rules=" {required: pItem.is_required==='2', message: '必填', trigger: 'blur'}"
      :class="{'content-form-block': block}"
    >
      <!-- item.col 控制表单布局 -->
      <el-col 
        v-for="item in pItem.children.length===0 ? [pItem]: pItem.children" 
        :key="item.id" 
        :span="+item.col"
      >
        <component
          v-if="pItem.children.length===0" 
          :is="item.formType" 
          :item="item" 
          @change='change'
        ></component>
        <!-- item.is_required 控制表单必填性 -->
        <el-form-item 
          v-else
          :prop="pItem.children.length!==0 ? item.tbl: ''" 
          :rules="{ required: item.is_required==='2', message: '必填', trigger: 'blur' }"
        >
          <!-- item.formType 映射的自定义表单组件 -->
          <component
            :is="item.formType" 
            :item="item" 
          ></component>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import components from './index.js'
export default {
  components,
  props: {
    formData: {
      required: true,
      default: () => {}
    },
    // 表单布局样式
    block: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ruleForm(){
      let obj = {}
      this.formData.map(i => {
        if (i.children.length === 0) {
          obj[i.tbl] = i.tbl_val
        } else {
          i.children.map(m => {
            obj[m.tbl] = m.tbl_val
          })
        }
      })
      return obj
    },
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return
      })
    },
    change(item) {
      this.$emit('change', item)
    },
  }
}
</script>
<style lang="less" scoped>
.content-form{
  width: 500px;
}
.content-form-block {
  /deep/.el-form-item__label{
    width: 100%;
    text-align: left;
  }
}
/deep/ .el-select{
  display: block;
}
/deep/.el-form-item .el-form-item--small {
  margin-bottom: 0;
}
</style>