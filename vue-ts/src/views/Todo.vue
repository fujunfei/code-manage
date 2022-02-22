<template>
<div>
  <div class="content">
    <a-input class="content-input" v-model:value="content" @pressEnter="pressEnter" placeholder="What needs to be done?">
      <template #prefix>
        <down-outlined style="color: rgba(0, 0, 0, 0.45)" />
      </template>
    </a-input>
    <ul class="dragDom">
      <li v-for="(i, index) in filerList" :key="i.id">
        <a-checkbox v-model:checked="i.checked" >
          <div class="content-list-label">
            <div :class="{'todo-over': i.checked}">{{i.value}}</div>
            <div @click="preventDafault" class="content-list-label-icon">
              <menu-outlined style="color: rgba(0, 0, 0, 0.45)" />
              &nbsp;
              <close-outlined @click="deleteItem(index)" style="color: #df8181" />
            </div>
          </div>
        </a-checkbox>
      </li>
    </ul>
    <!-- 操作按钮 -->
    <div class="content-bottom">
      <span>{{filerList.filter(i => !i.checked).length}} item left</span>
      <span>
        <a-button :type="btnStatus[0]" @click="choose(0)">All</a-button>
        <a-button :type="btnStatus[1]" @click="choose(1)">Active</a-button>
        <a-button :type="btnStatus[2]" @click="choose(2)">Completed</a-button>
      </span>
      <span 
        @click="clearChecked" 
        class="clear-todos"
        :class="{'clear-todo': filerList.filter(i => i.checked).length === 0 }" 
      >
        {{ 'Clear completed'}}
      </span>
    </div>
  </div>
  <div style="margin-top: 30px">
    <a-upload
      name="file"
      action="/"
      :showUploadList="false"
      :before-upload="beforeUpload"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        Click to Upload
      </a-button>
    </a-upload>
    <a-button class="todo-down" type="ghost" @click="download">Click for Save</a-button>
  </div>
</div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watchEffect, createVNode, onMounted  } from 'vue';
import { DownOutlined,MenuOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import Sortable from 'sortablejs'
import {saveJSON} from './fileExport'
export default defineComponent({
  components: { DownOutlined, MenuOutlined, CloseOutlined },
  setup() {
    interface todo {
      value: string
      checked: boolean
      id: number
    }
    interface State  {
      list: Array<todo>,
      filerList: Array<todo>,
      btnStatus: Array<string>,
      filterType: string
    }

    // 过滤状态All：0， Active：1， Completed：2
    enum FilterType {
      All,
      Active, 
      Completed
    } 
    
    const content = ref<string>('')
    const state = reactive<State>({
      list: [],
      filerList: [],
      btnStatus: ['default','text','text'],
      // 记录选中的过滤状态 
      filterType: FilterType[0]
    })
    const pressEnter = (): void => {
      if (!!content.value) {
        state.list.push({
          value: content.value,
          checked: false,
          id: new Date().getTime()
        })
        content.value = ''
      }
    }
    const choose = (type: number): void => {
      state.btnStatus.forEach((i, index) => {
        if (i === 'default') {
          state.btnStatus[index] = 'text'
        }
      })
      state.btnStatus[type] = "default"
      // filterTodo默认 ALL
      state.filterType = FilterType[type]
    }
    // 清楚已完成
    const clearChecked = () => {
      if (state.filerList.filter(i => i.checked).length === 0) return
      Modal.confirm({
        title: 'Clear completed ?',
        icon: createVNode(ExclamationCircleOutlined),
        onOk() {
          state.list = state.list.filter(i => !i.checked)
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'clear-model',
        closable:true
      });
    }
    const preventDafault = (e) => {
      // 阻止事件冒泡,触发checkbox的选中
      if (e.isTrusted) {
        e.preventDefault()
      }
    }
    const deleteItem = index => {
      const ind = state.list.findIndex(i => i.value === state.filerList[index].value)
      state.list.splice(ind, 1)
    }

    // 绑定拖拽
    const rowDrag = () => {
      const tbody = document.querySelector('.dragDom')
      if (!tbody) return
      Sortable.create(tbody, {
        animation: 200,
        onEnd({ newIndex, oldIndex }) {
          const currRow = state.filerList.splice(oldIndex, 1)[0]
          state.filerList.splice(newIndex, 0, currRow)
        },
      })
    }
    // 下载json文件
    const download = () => {
      saveJSON(state.list, 'todo.json')
    }
    // 上传数据
    const beforeUpload = (file) => {
      const reader = new FileReader(); 
      reader.readAsText(file);//读取文件的内容
      reader.onload = function(){
        state.list = JSON.parse(<string>reader.result)
      };
      return false
    }

    watchEffect( () => {
      switch(state.filterType) {
        case 'All':
          state.filerList = state.list
          break
        case 'Active':
          state.filerList = state.list.filter(i => !i.checked)
          break
        case 'Completed':
          state.filerList = state.list.filter(i => i.checked)
          break
      } 
    })
    onMounted(() => {
      rowDrag()
    })
    return {
      ...toRefs(state),
      content,
      pressEnter,
      choose,
      clearChecked,
      preventDafault,
      deleteItem,
      beforeUpload,
      download
    }
  }
})
</script>
<style lang="sass">
  .clear-model
    top: 400px
</style>
<style lang="sass" scoped>
  .content
    width: 800px
    margin: 0 auto
    box-shadow: -3px 2px 5px #dfdfdf
    .content-list-label
      &-icon
        position: absolute
        right: 10px
        top: 0px
    .content-input
      height: 60px
    .todo-over
      color: #a7a7a7
      text-decoration: line-through
    .clear-todo
      visibility: hidden
    .clear-todos:hover
      cursor: pointer
      text-decoration: underline
    ul
      padding: 0
      margin: 0
      list-style-type: none
      text-align: left
      border-left: 1px solid #d9d9d9
      border-right: 1px solid #d9d9d9
      li
        height: 50px
        border-bottom: 1px solid #d9d9d9
        line-height: 50px
        padding-left: 10px
        position: relative
    .content-bottom
      display: flex
      justify-content: space-between
      padding: 0 10px
      height: 40px
      line-height: 40px
      border-bottom: 1px solid #d9d9d9
      border-left: 1px solid #d9d9d9
      border-right: 1px solid #d9d9d9
  .todo-down
    width: 125px
    height: 30px

</style>