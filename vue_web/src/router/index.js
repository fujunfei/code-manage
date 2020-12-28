
const routes = [
    { path: '/', redirect: '/element-dev'},
    // { path: '/menu', component: () => import('@/views/menu/menu.vue')},
    { path: '/fullPage', component: () => import('@/components/fullpage/fullPageApply.vue')},
    { path: '/element-dev', component: () => import('@/views/element/elementDev.vue') },
    {path: '/echarts', component: () => import('@/views/echarts/echarts.vue') },
    {path: '/table-drag', component: () => import('@/views/element/table.vue') },
    {path: '/table-drag-select', component: () => import('@/views/element/tableDragSelect.vue') },
    {path: '/ag-grid', component: () => import('@/views/element/ag-grid.vue')},
    {path: '/vxe-table', component: () => import('@/views/element/vxe-table.vue')}
]



export default routes