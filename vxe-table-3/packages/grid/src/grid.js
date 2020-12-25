import Table from '../../table'
import XEUtils from 'xe-utils/ctor'
import GlobalConfig from '../../conf'
import vSize from '../../mixins/size'
import VXETable from '../../v-x-e-table'
import { UtilTools, DomTools, GlobalEvent } from '../../tools'
import { clearTableDefaultStatus, clearTableAllStatus, isEnableConf } from '../../table/src/util'

const methods = {}
const propKeys = Object.keys(Table.props)

function getOffsetHeight (elem) {
  return elem ? elem.offsetHeight : 0
}

function getPaddingTopBottomSize (elem) {
  const computedStyle = getComputedStyle(elem)
  const paddingTop = XEUtils.toNumber(computedStyle.paddingTop)
  const paddingBottom = XEUtils.toNumber(computedStyle.paddingBottom)
  return paddingTop + paddingBottom
}

function renderDefaultForm (h, _vm) {
  const { proxyConfig, proxyOpts, formData, formConfig, formOpts } = _vm
  if (isEnableConf(formConfig) && formOpts.items && formOpts.items.length) {
    if (!formOpts.inited) {
      formOpts.inited = true
      const beforeItem = proxyOpts.beforeItem
      if (proxyOpts && beforeItem) {
        formOpts.items.forEach(item => {
          beforeItem.call(_vm, { $grid: _vm, item })
        })
      }
    }
    return [
      h('vxe-form', {
        props: Object.assign({}, formOpts, {
          data: proxyConfig && proxyOpts.form ? formData : formOpts.data
        }),
        on: {
          submit: _vm.submitEvent,
          reset: _vm.resetEvent,
          'submit-invalid': _vm.submitInvalidEvent,
          'toggle-collapse': _vm.togglCollapseEvent
        }
      })
    ]
  }
  return []
}

function getToolbarSlots (_vm) {
  const { $scopedSlots, toolbarOpts } = _vm
  const toolbarOptSlots = toolbarOpts.slots
  let $buttons
  let $tools
  const slots = {}
  if (toolbarOptSlots) {
    $buttons = toolbarOptSlots.buttons
    $tools = toolbarOptSlots.tools
    if ($buttons && $scopedSlots[$buttons]) {
      $buttons = $scopedSlots[$buttons]
    }
    if ($tools && $scopedSlots[$tools]) {
      $tools = $scopedSlots[$tools]
    }
  }
  if ($buttons) {
    slots.buttons = $buttons
  }
  if ($tools) {
    slots.tools = $tools
  }
  return slots
}

function getPagerSlots (_vm) {
  const { $scopedSlots, pagerOpts } = _vm
  const pagerOptSlots = pagerOpts.slots
  const slots = {}
  let $left
  let $right
  if (pagerOptSlots) {
    $left = pagerOptSlots.left
    $right = pagerOptSlots.right
    if ($left && $scopedSlots[$left]) {
      $left = $scopedSlots[$left]
    }
    if ($right && $scopedSlots[$right]) {
      $right = $scopedSlots[$right]
    }
  }
  if ($left) {
    slots.left = $left
  }
  if ($right) {
    slots.right = $right
  }
  return slots
}

function getTableOns (_vm) {
  const { $listeners, proxyConfig, proxyOpts } = _vm
  const ons = {}
  XEUtils.each($listeners, (cb, type) => {
    ons[type] = (...args) => {
      _vm.$emit(type, ...args)
    }
  })
  if (proxyConfig) {
    if (proxyOpts.sort) {
      ons['sort-change'] = _vm.sortChangeEvent
    }
    if (proxyOpts.filter) {
      ons['filter-change'] = _vm.filterChangeEvent
    }
  }
  return ons
}

Object.keys(Table.methods).forEach(name => {
  methods[name] = function (...args) {
    return this.$refs.xTable && this.$refs.xTable[name](...args)
  }
})

export default {
  name: 'VxeGrid',
  mixins: [vSize],
  props: {
    ...Table.props,
    columns: Array,
    pagerConfig: [Boolean, Object],
    proxyConfig: Object,
    toolbar: [Boolean, Object],
    toolbarConfig: [Boolean, Object],
    formConfig: [Boolean, Object],
    zoomConfig: Object,
    size: { type: String, default: () => GlobalConfig.grid.size || GlobalConfig.size }
  },
  provide () {
    return {
      $xegrid: this
    }
  },
  data () {
    return {
      tableLoading: false,
      isZMax: false,
      tableData: [],
      pendingRecords: [],
      filterData: [],
      formData: {},
      sortData: [],
      tZindex: 0,
      tablePage: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  computed: {
    isMsg () {
      return this.proxyOpts.message !== false
    },
    proxyOpts () {
      return Object.assign({}, GlobalConfig.grid.proxyConfig, this.proxyConfig)
    },
    pagerOpts () {
      return Object.assign({}, GlobalConfig.grid.pagerConfig, this.pagerConfig)
    },
    formOpts () {
      return Object.assign({}, GlobalConfig.grid.formConfig, this.formConfig)
    },
    toolbarOpts () {
      return Object.assign({}, GlobalConfig.grid.toolbarConfig, this.toolbarConfig || this.toolbar)
    },
    zoomOpts () {
      return Object.assign({}, GlobalConfig.grid.zoomConfig, this.zoomConfig)
    },
    renderStyle () {
      return this.isZMax ? { zIndex: this.tZindex } : null
    },
    tableExtendProps () {
      const rest = {}
      propKeys.forEach(key => {
        rest[key] = this[key]
      })
      return rest
    },
    tableProps () {
      const { isZMax, seqConfig, pagerConfig, loading, editConfig, proxyConfig, proxyOpts, tableExtendProps, tableLoading, tablePage, tableData } = this
      const tableProps = Object.assign({}, tableExtendProps)
      if (isZMax) {
        if (tableExtendProps.maxHeight) {
          tableProps.maxHeight = 'auto'
        } else {
          tableProps.height = 'auto'
        }
      }
      if (proxyConfig) {
        tableProps.loading = loading || tableLoading
        tableProps.data = tableData
        tableProps.rowClassName = this.handleRowClassName
        if ((proxyOpts.seq || proxyOpts.index) && isEnableConf(pagerConfig)) {
          tableProps.seqConfig = Object.assign({}, seqConfig, { startIndex: (tablePage.currentPage - 1) * tablePage.pageSize })
        }
      }
      if (editConfig) {
        tableProps.editConfig = Object.assign({}, editConfig, { activeMethod: this.handleActiveMethod })
      }
      return tableProps
    },
    pagerProps () {
      return Object.assign({}, this.pagerOpts, this.proxyConfig ? this.tablePage : {})
    }
  },
  watch: {
    columns (value) {
      this.$nextTick(() => this.loadColumn(value))
    },
    toolbar (value) {
      if (value) {
        this.initToolbar()
      }
    },
    toolbarConfig (value) {
      if (value) {
        this.initToolbar()
      }
    },
    proxyConfig () {
      this.initProxy()
    },
    pagerConfig () {
      this.initPages()
    }
  },
  created () {
    const { data, formOpts, proxyOpts, proxyConfig } = this
    if (proxyConfig && (data || (proxyOpts.form && formOpts.data))) {
      console.error('[vxe-grid] There is a conflict between the props proxy-config and data.')
    }

    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      if (this.toolbar) {
        UtilTools.warn('vxe.error.delProp', ['grid.toolbar', 'grid.toolbar-config'])
      }
      if (this.toolbarConfig && !XEUtils.isObject(this.toolbarConfig)) {
        UtilTools.warn('vxe.error.errProp', [`grid.toolbar-config=${this.toolbarConfig}`, 'grid.toolbar-config={}'])
      }
    }

    GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent)
  },
  mounted () {
    if (this.columns && this.columns.length) {
      this.loadColumn(this.columns)
    }
    this.initToolbar()
    this.initPages()
    this.initProxy()
  },
  destroyed () {
    GlobalEvent.off(this, 'keydown')
  },
  render (h) {
    const { $scopedSlots, vSize, isZMax } = this
    const hasForm = !!($scopedSlots.form || isEnableConf(this.formConfig))
    const hasToolbar = !!($scopedSlots.toolbar || isEnableConf(this.toolbarConfig) || this.toolbar)
    const hasPager = !!($scopedSlots.pager || isEnableConf(this.pagerConfig))
    return h('div', {
      class: ['vxe-grid', {
        [`size--${vSize}`]: vSize,
        't--animat': !!this.animat,
        'is--round': this.round,
        'is--maximize': isZMax,
        'is--loading': this.loading || this.tableLoading
      }],
      style: this.renderStyle
    }, [
      /**
       * 渲染表单
       */
      hasForm ? h('div', {
        ref: 'formWrapper',
        class: 'vxe-grid--form-wrapper'
      }, $scopedSlots.form
        ? $scopedSlots.form.call(this, { $grid: this }, h)
        : renderDefaultForm(h, this)
      ) : null,
      /**
       * 渲染工具栏
       */
      hasToolbar ? h('div', {
        ref: 'toolbarWrapper',
        class: 'vxe-grid--toolbar-wrapper'
      }, $scopedSlots.toolbar
        ? $scopedSlots.toolbar.call(this, { $grid: this }, h)
        : [
          h('vxe-toolbar', {
            props: this.toolbarOpts,
            ref: 'xToolbar',
            scopedSlots: getToolbarSlots(this)
          })
        ]
      ) : null,
      /**
       * 渲染表格顶部区域
       */
      $scopedSlots.top ? h('div', {
        ref: 'topWrapper',
        class: 'vxe-grid--top-wrapper'
      }, $scopedSlots.top.call(this, { $grid: this }, h)) : null,
      /**
       * 渲染表格
       */
      h('vxe-table', {
        props: this.tableProps,
        on: getTableOns(this),
        scopedSlots: $scopedSlots,
        ref: 'xTable'
      }),
      /**
       * 渲染表格底部区域
       */
      $scopedSlots.bottom ? h('div', {
        ref: 'bottomWrapper',
        class: 'vxe-grid--bottom-wrapper'
      }, $scopedSlots.bottom.call(this, { $grid: this }, h)) : null,
      /**
       * 渲染分页
       */
      hasPager ? h('div', {
        ref: 'pagerWrapper',
        class: 'vxe-grid--pager-wrapper'
      }, $scopedSlots.pager
        ? $scopedSlots.pager.call(this, { $grid: this }, h)
        : [
          h('vxe-pager', {
            props: this.pagerProps,
            on: {
              'page-change': this.pageChangeEvent
            },
            scopedSlots: getPagerSlots(this)
          })
        ]
      ) : null
    ])
  },
  methods: {
    ...methods,
    getParentHeight () {
      return (this.isZMax ? DomTools.getDomNode().visibleHeight : this.$el.parentNode.clientHeight) - this.getExcludeHeight()
    },
    /**
     * 获取需要排除的高度
     */
    getExcludeHeight () {
      const { $refs, $el, isZMax, height } = this
      const { formWrapper, toolbarWrapper, topWrapper, bottomWrapper, pagerWrapper } = $refs
      const parentPaddingSize = isZMax || height !== 'auto' ? 0 : getPaddingTopBottomSize($el.parentNode)
      return parentPaddingSize + getPaddingTopBottomSize($el) + getOffsetHeight(formWrapper) + getOffsetHeight(toolbarWrapper) + getOffsetHeight(topWrapper) + getOffsetHeight(bottomWrapper) + getOffsetHeight(pagerWrapper)
    },
    handleRowClassName (params) {
      const rowClassName = this.rowClassName
      const clss = []
      if (this.pendingRecords.some(item => item === params.row)) {
        clss.push('row--pending')
      }
      return clss.push(rowClassName ? XEUtils.isFunction(rowClassName) ? rowClassName(params) : rowClassName : '')
    },
    handleActiveMethod (params) {
      const { editConfig } = this
      const activeMethod = editConfig ? editConfig.activeMethod : null
      return this.pendingRecords.indexOf(params.row) === -1 && (!activeMethod || activeMethod(params))
    },
    loadColumn (columns) {
      const { $scopedSlots } = this
      XEUtils.eachTree(columns, column => {
        if (column.slots) {
          XEUtils.each(column.slots, (func, name, colSlots) => {
            if (!XEUtils.isFunction(func)) {
              if ($scopedSlots[func]) {
                colSlots[name] = $scopedSlots[func]
              } else {
                colSlots[name] = null
                UtilTools.error('vxe.error.notSlot', [func])
              }
            }
          })
        }
      })
      return this.$refs.xTable.loadColumn(columns)
    },
    reloadColumn (columns) {
      this.clearAll()
      return this.loadColumn(columns)
    },
    initToolbar () {
      this.$nextTick(() => {
        const { xTable, xToolbar } = this.$refs
        if (xTable && xToolbar) {
          xTable.connect(xToolbar)
        }
      })
    },
    initPages () {
      const { tablePage, pagerConfig, pagerOpts } = this
      const { currentPage, pageSize } = pagerOpts
      if (pagerConfig) {
        if (currentPage) {
          tablePage.currentPage = currentPage
        }
        if (pageSize) {
          tablePage.pageSize = pageSize
        }
      }
    },
    initProxy () {
      const { proxyInited, proxyConfig, proxyOpts, formConfig, formOpts } = this
      if (proxyConfig) {
        if (isEnableConf(formConfig) && proxyOpts.form && formOpts.items) {
          const formData = {}
          formOpts.items.forEach(({ field, itemRender }) => {
            if (field) {
              formData[field] = itemRender && !XEUtils.isUndefined(itemRender.defaultValue) ? itemRender.defaultValue : undefined
            }
          })
          this.formData = formData
        }
        if (!proxyInited && proxyOpts.autoLoad !== false) {
          this.proxyInited = true
          this.$nextTick(() => this.commitProxy('init'))
        }
      }
    },
    handleGlobalKeydownEvent (evnt) {
      const isEsc = evnt.keyCode === 27
      if (isEsc && this.isZMax && this.zoomOpts.escRestore !== false) {
        this.triggerZoomEvent(evnt)
      }
    },
    /**
     * 提交指令，支持 code 或 button
     * @param {String/Object} code 字符串或对象
     */
    commitProxy (proxyTarget, ...args) {
      const { $refs, toolbar, toolbarConfig, toolbarOpts, proxyOpts, tablePage, pagerConfig, sortData, filterData, formData, isMsg } = this
      const { beforeQuery, afterQuery, beforeDelete, afterDelete, beforeSave, afterSave, ajax = {}, props: proxyProps = {} } = proxyOpts
      const $xetable = $refs.xTable
      let button
      let code
      if (XEUtils.isString(proxyTarget)) {
        const matchObj = toolbarConfig || toolbar ? XEUtils.findTree(toolbarOpts.buttons, item => item.code === proxyTarget, { children: 'dropdowns' }) : null
        code = proxyTarget
        button = matchObj ? matchObj.item : null
      } else {
        button = proxyTarget
        code = button.code
      }
      const btnParams = button ? button.params : null
      switch (code) {
        case 'insert':
          this.insert()
          break
        case 'insert_actived':
          this.insert().then(({ row }) => this.setActiveRow(row))
          break
        case 'mark_cancel':
          this.triggerPendingEvent(code)
          break
        case 'remove':
          return this.handleDeleteRow(code, 'vxe.grid.removeSelectRecord', () => this.removeCheckboxRow())
        case 'import':
          this.importData(btnParams)
          break
        case 'open_import':
          this.openImport(btnParams)
          break
        case 'export':
          this.exportData(btnParams)
          break
        case 'open_export':
          this.openExport(btnParams)
          break
        case 'reset_custom':
          this.resetColumn(true)
          break
        case 'init':
        case 'reload':
        case 'query': {
          const isInited = code === 'init'
          const isReload = code === 'reload'
          const ajaxMethods = ajax.query
          if (ajaxMethods) {
            const params = {
              code,
              button,
              $grid: this,
              sort: sortData.length ? sortData[0] : {},
              sorts: sortData,
              filters: filterData,
              form: formData,
              options: ajaxMethods
            }
            if (pagerConfig) {
              if (isReload) {
                tablePage.currentPage = 1
              }
              if (isEnableConf(pagerConfig)) {
                params.page = tablePage
              }
            }
            if (isInited || isReload) {
              const checkedFilters = isInited ? this.getCheckedFilters() : []
              let defaultSort = $xetable.sortOpts.defaultSort
              let sortParams = []
              // 如果使用默认排序
              if (defaultSort) {
                if (!XEUtils.isArray(defaultSort)) {
                  defaultSort = [defaultSort]
                }
                sortParams = defaultSort.map((item) => {
                  return {
                    property: item.field,
                    order: item.order
                  }
                })
              }
              this.sortData = params.sorts = sortParams
              this.filterData = params.filters = isInited ? checkedFilters : []
              this.pendingRecords = []
              params.sort = params.sorts.length ? params.sorts[0] : {}
              this.$nextTick(() => {
                if (isInited) {
                  clearTableDefaultStatus($xetable)
                } else {
                  clearTableAllStatus($xetable)
                }
              })
            }
            const applyArgs = [params].concat(args)
            this.tableLoading = true
            return Promise.resolve((beforeQuery || ajaxMethods)(...applyArgs))
              .catch(e => e)
              .then(rest => {
                this.tableLoading = false
                if (rest) {
                  if (isEnableConf(pagerConfig)) {
                    tablePage.total = XEUtils.get(rest, proxyProps.total || 'page.total') || 0
                    this.tableData = XEUtils.get(rest, proxyProps.result || 'result') || []
                  } else {
                    this.tableData = (proxyProps.list ? XEUtils.get(rest, proxyProps.list) : rest) || []
                  }
                } else {
                  this.tableData = []
                }
                if (afterQuery) {
                  afterQuery(...applyArgs)
                }
              })
          } else {
            UtilTools.error('vxe.error.notFunc', ['query'])
          }
          break
        }
        case 'delete': {
          const ajaxMethods = ajax.delete
          if (ajaxMethods) {
            const removeRecords = this.getCheckboxRecords()
            const body = { removeRecords }
            const applyArgs = [{ $grid: this, code, button, body, options: ajaxMethods }].concat(args)
            if (removeRecords.length) {
              return this.handleDeleteRow(code, 'vxe.grid.deleteSelectRecord', () => {
                this.tableLoading = true
                return Promise.resolve((beforeDelete || ajaxMethods)(...applyArgs))
                  .then(rest => {
                    this.tableLoading = false
                    this.pendingRecords = this.pendingRecords.filter(row => removeRecords.indexOf(row) === -1)
                    if (isMsg) {
                      VXETable.modal.message({ message: this.getRespMsg(rest, 'vxe.grid.delSuccess'), status: 'success' })
                    }
                    if (afterDelete) {
                      afterDelete(...applyArgs)
                    } else {
                      this.commitProxy('query')
                    }
                  })
                  .catch(rest => {
                    this.tableLoading = false
                    if (isMsg) {
                      VXETable.modal.message({ id: code, message: this.getRespMsg(rest, 'vxe.grid.operError'), status: 'error' })
                    }
                  })
              })
            } else {
              if (isMsg) {
                VXETable.modal.message({ id: code, message: GlobalConfig.i18n('vxe.grid.selectOneRecord'), status: 'warning' })
              }
            }
          } else {
            UtilTools.error('vxe.error.notFunc', [code])
          }
          break
        }
        case 'save': {
          const ajaxMethods = ajax.save
          if (ajaxMethods) {
            const body = Object.assign({ pendingRecords: this.pendingRecords }, this.getRecordset())
            const { insertRecords, removeRecords, updateRecords, pendingRecords } = body
            const applyArgs = [{ $grid: this, code, button, body, options: ajaxMethods }].concat(args)
            // 排除掉新增且标记为删除的数据
            if (insertRecords.length) {
              body.pendingRecords = pendingRecords.filter(row => insertRecords.indexOf(row) === -1)
            }
            // 排除已标记为删除的数据
            if (pendingRecords.length) {
              body.insertRecords = insertRecords.filter(row => pendingRecords.indexOf(row) === -1)
            }
            // 只校验新增和修改的数据
            return this.validate(body.insertRecords.concat(updateRecords)).then(() => {
              if (body.insertRecords.length || removeRecords.length || updateRecords.length || body.pendingRecords.length) {
                this.tableLoading = true
                return Promise.resolve((beforeSave || ajaxMethods)(...applyArgs))
                  .then(rest => {
                    this.tableLoading = false
                    this.pendingRecords = []
                    if (isMsg) {
                      VXETable.modal.message({ message: this.getRespMsg(rest, 'vxe.grid.saveSuccess'), status: 'success' })
                    }
                    if (afterSave) {
                      afterSave(...applyArgs)
                    } else {
                      this.commitProxy('query')
                    }
                  })
                  .catch(rest => {
                    this.tableLoading = false
                    if (isMsg) {
                      VXETable.modal.message({ id: code, message: this.getRespMsg(rest, 'vxe.grid.operError'), status: 'error' })
                    }
                  })
              } else {
                if (isMsg) {
                  VXETable.modal.message({ id: code, message: GlobalConfig.i18n('vxe.grid.dataUnchanged'), status: 'info' })
                }
              }
            }).catch(errMap => errMap)
          } else {
            UtilTools.error('vxe.error.notFunc', [code])
          }
          break
        }
        default: {
          const btnMethod = VXETable.commands.get(code)
          if (btnMethod) {
            btnMethod({ code, button, $grid: this, $table: $xetable }, ...args)
          }
        }
      }
      return this.$nextTick()
    },
    getRespMsg (rest, defaultMsg) {
      const { props: proxyProps = {} } = this.proxyOpts
      let msg
      if (rest && proxyProps.message) {
        msg = XEUtils.get(rest, proxyProps.message)
      }
      return msg || GlobalConfig.i18n(defaultMsg)
    },
    handleDeleteRow (code, alertKey, callback) {
      const selectRecords = this.getCheckboxRecords()
      if (this.isMsg) {
        if (selectRecords.length) {
          return VXETable.modal.confirm({ id: `cfm_${code}`, message: GlobalConfig.i18n(alertKey), escClosable: true }).then(type => {
            if (type === 'confirm') {
              callback()
            }
          })
        } else {
          VXETable.modal.message({ id: `msg_${code}`, message: GlobalConfig.i18n('vxe.grid.selectOneRecord'), status: 'warning' })
        }
      } else {
        if (selectRecords.length) {
          callback()
        }
      }
      return Promise.resolve()
    },
    getFormItems (index) {
      const { formConfig, formOpts } = this
      const items = isEnableConf(formConfig) && formOpts.items ? formOpts.items : []
      return arguments.length ? items[index] : items
    },
    getPendingRecords () {
      return this.pendingRecords
    },
    triggerToolbarBtnEvent (button, evnt) {
      this.commitProxy(button, evnt)
      this.$emit('toolbar-button-click', { code: button.code, button, $grid: this, $event: evnt })
    },
    triggerPendingEvent (code) {
      const { pendingRecords, isMsg } = this
      const selectRecords = this.getCheckboxRecords()
      if (selectRecords.length) {
        const plus = []
        const minus = []
        selectRecords.forEach(data => {
          if (pendingRecords.some(item => data === item)) {
            minus.push(data)
          } else {
            plus.push(data)
          }
        })
        if (minus.length) {
          this.pendingRecords = pendingRecords.filter(item => minus.indexOf(item) === -1).concat(plus)
        } else if (plus.length) {
          this.pendingRecords = pendingRecords.concat(plus)
        }
        this.clearCheckboxRow()
      } else {
        if (isMsg) {
          VXETable.modal.message({ id: code, message: GlobalConfig.i18n('vxe.grid.selectOneRecord'), status: 'warning' })
        }
      }
    },
    pageChangeEvent (params) {
      const { proxyConfig, tablePage } = this
      const { currentPage, pageSize } = params
      tablePage.currentPage = currentPage
      tablePage.pageSize = pageSize
      this.$emit('page-change', Object.assign({ $grid: this }, params))
      if (proxyConfig) {
        this.commitProxy('query')
      }
    },
    sortChangeEvent (params) {
      const { $table, column, sortList } = params
      const isRemote = XEUtils.isBoolean(column.remoteSort) ? column.remoteSort : $table.sortOpts.remote
      // 如果是服务端排序
      if (isRemote) {
        this.sortData = sortList
        if (this.proxyConfig) {
          this.tablePage.currentPage = 1
          this.commitProxy('query')
        }
      }
      this.$emit('sort-change', Object.assign({ $grid: this }, params))
    },
    filterChangeEvent (params) {
      const { $table, filterList } = params
      // 如果是服务端过滤
      if ($table.filterOpts.remote) {
        this.filterData = filterList
        if (this.proxyConfig) {
          this.tablePage.currentPage = 1
          this.commitProxy('query')
        }
      }
      this.$emit('filter-change', Object.assign({ $grid: this }, params))
    },
    submitEvent (params) {
      const { proxyConfig } = this
      if (proxyConfig) {
        this.commitProxy('reload')
      }
      this.$emit('form-submit', Object.assign({ $grid: this }, params))
    },
    resetEvent (params) {
      const { proxyConfig } = this
      if (proxyConfig) {
        this.commitProxy('reload')
      }
      this.$emit('form-reset', Object.assign({ $grid: this }, params))
    },
    submitInvalidEvent (params) {
      this.$emit('form-submit-invalid', Object.assign({ $grid: this }, params))
    },
    togglCollapseEvent (params) {
      this.$nextTick(() => this.recalculate(true))
      this.$emit('form-toggle-collapse', Object.assign({ $grid: this }, params))
    },
    triggerZoomEvent (evnt) {
      this.zoom()
      this.$emit('zoom', { $grid: this, type: this.isZMax ? 'max' : 'revert', $event: evnt })
    },
    zoom () {
      return this[this.isZMax ? 'revert' : 'maximize']()
    },
    isMaximized () {
      return this.isZMax
    },
    maximize () {
      return this.handleZoom(true)
    },
    revert () {
      return this.handleZoom()
    },
    handleZoom (isMax) {
      const { isZMax } = this
      if (isMax ? !isZMax : isZMax) {
        this.isZMax = !isZMax
        if (this.tZindex < UtilTools.getLastZIndex()) {
          this.tZindex = UtilTools.nextZIndex()
        }
      }
      return this.$nextTick().then(() => this.recalculate(true)).then(() => this.isZMax)
    },
    getProxyInfo () {
      const { sortData } = this
      return this.proxyConfig ? {
        data: this.tableData,
        filter: this.filterData,
        form: this.formData,
        sort: sortData.length ? sortData[0] : {},
        sorts: sortData,
        pager: this.tablePage,
        pendingRecords: this.pendingRecords
      } : null
    }
  }
}
