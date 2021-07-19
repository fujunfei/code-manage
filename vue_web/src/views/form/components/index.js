const components = {
  // 表单加载时，异步渲染组件
  FleField: () => import('./fle-field.vue'),
  FleSelect: () => import('./fle-select.vue'),
  FleButton: () => import('./fle-button.vue'),
}

export default components