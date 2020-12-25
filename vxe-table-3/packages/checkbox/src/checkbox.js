import { UtilTools } from '../../tools'
import XEUtils from 'xe-utils/ctor'
import GlobalConfig from '../../conf'
import vSize from '../../mixins/size'

export default {
  name: 'VxeCheckbox',
  mixins: [vSize],
  props: {
    value: Boolean,
    label: [String, Number],
    indeterminate: Boolean,
    title: [String, Number],
    content: [String, Number],
    disabled: Boolean,
    size: { type: String, default: () => GlobalConfig.checkbox.size || GlobalConfig.size }
  },
  inject: {
    $xecheckboxgroup: {
      default: null
    }
  },
  computed: {
    isGroup () {
      return this.$xecheckboxgroup
    },
    isDisabled () {
      return this.disabled || (this.isGroup && this.$xecheckboxgroup.disabled)
    }
  },
  render (h) {
    const { $scopedSlots, $xecheckboxgroup, isGroup, isDisabled, title, vSize, indeterminate, value, label, content } = this
    const attrs = {}
    if (title) {
      attrs.title = title
    }
    return h('label', {
      class: ['vxe-checkbox', {
        [`size--${vSize}`]: vSize,
        'is--indeterminate': indeterminate,
        'is--disabled': isDisabled
      }],
      attrs
    }, [
      h('input', {
        class: 'vxe-checkbox--input',
        attrs: {
          type: 'checkbox',
          disabled: isDisabled
        },
        domProps: {
          checked: isGroup ? XEUtils.includes($xecheckboxgroup.value, label) : value
        },
        on: {
          change: this.changeEvent
        }
      }),
      h('span', {
        class: 'vxe-checkbox--icon'
      }),
      h('span', {
        class: 'vxe-checkbox--label'
      }, $scopedSlots.default ? $scopedSlots.default.call(this, {}) : [UtilTools.getFuncText(content)])
    ])
  },
  methods: {
    changeEvent (evnt) {
      const { $xecheckboxgroup, isGroup, isDisabled, label } = this
      if (!isDisabled) {
        const checked = evnt.target.checked
        const params = { checked, label, $event: evnt }
        if (isGroup) {
          $xecheckboxgroup.handleChecked(params)
        } else {
          this.$emit('input', checked)
          this.$emit('change', params)
        }
      }
    }
  }
}
