
const routes = [
    { path: '/', redirect: '/content'},
    // { path: '/menu', component: () => import('@/views/menu/menu.vue')},
    { path: '/fullPage', component: () => import('@/components/fullPageApply.vue')},
    { path: '/element', component: () => import('@/views/element/element.vue') },
    {path: '/content', component: () => import('@/views/content/content.vue') }
]



export default routes