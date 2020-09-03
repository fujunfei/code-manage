
const routes = [
    { path: '/', redirect: '/element-dev'},
    // { path: '/menu', component: () => import('@/views/menu/menu.vue')},
    { path: '/fullPage', component: () => import('@/components/fullpage/fullPageApply.vue')},
    { path: '/element-dev', component: () => import('@/views/element/elementDev.vue') },
    {path: '/echarts', component: () => import('@/views/echarts/echarts.vue') }
]



export default routes