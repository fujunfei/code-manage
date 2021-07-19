<template>
  <formConfig
    ref="form"
    block
    :form-data='formData'
    @change="change"
  />
</template>
<script>
import formConfig from './components/index.vue'
import formData from './dict'

export default {
  components: {formConfig},
  data() {
    return {
      formData,
    }
  },
  methods: {
    change(item) {
      if (typeof this[`change_${item.tbl}`] === 'function') return this[`change_${item.tbl}`](item)
      else return () => {}
    },
    // 表单业务交互、表单关联等
    change_city(item) {
      this.formData.forEach(i => {
        if (i.tbl === 'resume' && item.tbl_val === 'shanghai') {
          // 隐藏表单
          // i.display = false
          // 必填
          i.is_required = '1'
          return
        }
        if (i.tbl === 'resume' && item.tbl_val !== 'shanghai') {
          // i.display = true
          i.is_required = '2'
          return
        }
      })
    }
  },
}
</script>