<template>
  <el-popover
    v-bind="$attrs"
    v-model="visible"
    trigger="manual"
  >
  <div class="el-popconfirm">
    <p class="el-popconfirm__main">
    <i
      v-if="!hideIcon"
      :class="icon"
      class="el-popconfirm__icon"
      :style="{color: iconColor}"
    ></i>
      {{title}}
    </p>
    <div class="el-popconfirm__action" style="display: flex;justify-content:space-around;padding-top: 8px;">
      <el-button 
        size="mini" 
        :type="confirmButtonType" 
        @click="tomorrow"
        plain
      >
        {{cancelButtonText}}
      </el-button>
      <el-button 
        size="mini" 
        :type="confirmButtonType" 
        @click="today"
        plain
      >
        {{confirmButtonText}}
      </el-button>
    </div>
  </div>
  <slot name="reference" slot="reference"></slot>
</el-popover>
</template>

<script>
import ElPopover from 'element-ui/packages/popover';
import ElButton from 'element-ui/packages/button';
import {t} from 'element-ui/src/locale';

export default {
  name: 'popConfirm',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    confirmButtonText: {
      type: String,
      default: t('el.popconfirm.confirmButtonText')
    },
    cancelButtonText: {
      type: String,
      default: t('el.popconfirm.cancelButtonText')
    },
    confirmButtonType: {
      type: String,
      default: 'primary'
    },
    cancelButtonType: {
      type: String,
      default: 'text'
    },
    icon: {
      type: String,
      default: 'el-icon-question'
    },
    iconColor: {
      type: String,
      default: '#f90'
    },
    hideIcon: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ElPopover,
    ElButton
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    tomorrow() {
      this.visible = false;
      this.$emit('onLeft');
      this.$emit('update:show', false)
    },
    today() {
      this.visible = false;
      this.$emit('update:show', false)
      this.$emit('onRight');
    }
  },
  watch: {
    show() {
      this.visible = this.show;
    }
  }
};
</script>
