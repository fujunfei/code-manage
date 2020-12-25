import XEUtils from 'xe-utils/ctor'
import { UtilTools, DomTools } from '../../tools'
import VXETable from '../../v-x-e-table'

export default {
  methods: {
    /**
     * 修改筛选条件列表
     * @param {ColumnInfo} column 列
     * @param {Array} options 选项
     */
    _setFilter (column, options) {
      if (column.filters && options) {
        column.filters = UtilTools.getFilters(options)
      }
      return this.$nextTick()
    },
    checkFilterOptions () {
      const { filterStore } = this
      filterStore.isAllSelected = filterStore.options.every(item => item._checked)
      filterStore.isIndeterminate = !filterStore.isAllSelected && filterStore.options.some(item => item._checked)
    },
    /**
     * 点击筛选事件
     * 当筛选图标被点击时触发
     * 更新选项是否全部状态
     * 打开筛选面板
     * @param {Event} evnt 事件
     * @param {ColumnInfo} column 列配置
     * @param {Object} params 参数
     */
    triggerFilterEvent (evnt, column, params) {
      const { filterStore } = this
      if (filterStore.column === column && filterStore.visible) {
        filterStore.visible = false
      } else {
        const { target: targetElem, pageX } = evnt
        const { visibleWidth } = DomTools.getDomNode()
        Object.assign(filterStore, {
          args: params,
          multiple: column.filterMultiple,
          options: column.filters,
          column,
          style: null,
          visible: true
        })
        // 复原状态
        filterStore.options.forEach(option => {
          option._checked = option.checked
        })
        this.checkFilterOptions()
        this.initStore.filter = true
        this.$nextTick(() => {
          const { $refs } = this
          const bodyElem = $refs.tableBody.$el
          const filterWrapperElem = $refs.filterWrapper.$el
          const filterWidth = filterWrapperElem.offsetWidth
          const centerWidth = filterWidth / 2
          const minMargin = 32
          let left, right
          const style = {
            top: `${targetElem.offsetTop + targetElem.offsetParent.offsetTop + targetElem.offsetHeight + 8}px`
          }
          if (column.fixed === 'left') {
            left = targetElem.offsetLeft + targetElem.offsetParent.offsetLeft - centerWidth
          } else if (column.fixed === 'right') {
            right = (targetElem.offsetParent.offsetWidth - targetElem.offsetLeft) + (targetElem.offsetParent.offsetParent.offsetWidth - targetElem.offsetParent.offsetLeft) - column.renderWidth - centerWidth
          } else {
            left = targetElem.offsetLeft + targetElem.offsetParent.offsetLeft - centerWidth - bodyElem.scrollLeft
          }
          if (left) {
            const overflowWidth = (pageX + filterWidth - centerWidth + minMargin) - visibleWidth
            if (overflowWidth > 0) {
              left -= overflowWidth
            }
            style.left = `${Math.max(minMargin, left)}px`
          } else if (right) {
            const overflowWidth = (pageX + filterWidth - centerWidth + minMargin) - visibleWidth
            if (overflowWidth > 0) {
              right += overflowWidth
            }
            style.right = `${right}px`
          }
          filterStore.style = style
        })
      }
    },
    _getCheckedFilters () {
      const { visibleColumn } = this
      const filterList = []
      visibleColumn.filter(column => {
        const { property, filters } = column
        const valueList = []
        const dataList = []
        if (filters && filters.length) {
          filters.forEach(item => {
            if (item.checked) {
              valueList.push(item.value)
              dataList.push(item.data)
            }
          })
          if (valueList.length) {
            filterList.push({ column, property, values: valueList, datas: dataList })
          }
        }
      })
      return filterList
    },
    /**
     * 确认筛选
     * 当筛选面板中的确定按钮被按下时触发
     * @param {Event} evnt 事件
     */
    confirmFilterEvent (evnt) {
      const { filterStore, filterOpts, scrollXLoad, scrollYLoad } = this
      const { column } = filterStore
      const { property } = column
      const values = []
      const datas = []
      column.filters.forEach(item => {
        if (item.checked) {
          values.push(item.value)
          datas.push(item.data)
        }
      })
      filterStore.visible = false
      const filterList = this.getCheckedFilters()
      // 如果是服务端筛选，则跳过本地筛选处理
      if (!filterOpts.remote) {
        this.handleTableData(true)
        this.checkSelectionStatus()
      }
      this.emitEvent('filter-change', { column, property, values, datas, filters: filterList, filterList }, evnt)
      this.updateFooter()
      if (scrollXLoad || scrollYLoad) {
        this.clearScroll()
        if (scrollYLoad) {
          this.updateScrollYSpace()
        }
      }
      this.closeFilter()
      this.$nextTick(() => {
        this.recalculate()
        this.updateCellAreas()
      })
    },
    handleClearFilter (column) {
      if (column) {
        const { filters, filterRender } = column
        if (filters) {
          const compConf = filterRender ? VXETable.renderer.get(filterRender.name) : null
          const filterResetMethod = compConf ? compConf.filterResetMethod : null
          filters.forEach((item) => {
            item._checked = false
            item.checked = false
            if (!filterResetMethod) {
              item.data = XEUtils.clone(item.resetValue, true)
            }
          })
          if (filterResetMethod) {
            filterResetMethod({ options: filters, column, $table: this })
          }
        }
      }
    },
    /**
     * 重置筛选
     * 当筛选面板中的重置按钮被按下时触发
     * @param {Event} evnt 事件
     */
    resetFilterEvent (evnt) {
      this.handleClearFilter(this.filterStore.column)
      this.confirmFilterEvent(evnt)
    },
    /**
     * 清空指定列的筛选条件
     * 如果为空则清空所有列的筛选条件
     * @param {String} fieldOrColumn 列
     */
    _clearFilter (fieldOrColumn) {
      const { filterStore } = this
      let column
      if (fieldOrColumn) {
        column = XEUtils.isString(fieldOrColumn) ? this.getColumnByField(fieldOrColumn) : fieldOrColumn
        if (column) {
          this.handleClearFilter(column)
        }
      } else {
        this.visibleColumn.forEach(this.handleClearFilter)
      }
      if (!fieldOrColumn || column !== filterStore.column) {
        Object.assign(filterStore, {
          isAllSelected: false,
          isIndeterminate: false,
          style: null,
          options: [],
          column: null,
          multiple: false,
          visible: false
        })
      }
      return this.updateData()
    }
  }
}
