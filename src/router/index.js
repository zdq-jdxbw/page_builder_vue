import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import axios from 'axios'
Vue.use(Router)

const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

const routes = [

    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home'),
        children:[
            {
                path: '/',
                name: 'WorkSpace',
                component: () => import('@/views/WorkSpace'),
            },
            {
                path: '/template',
                name: 'MyTemplate',
                component: () => import('@/views/MyTemplate'),
            },
            {
                path: '/doc',
                name: 'HelpDoc',
                component: () => import('@/views/HelpDoc'),
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Register')
    },
    
    
]
const router =new Router({
    mode:'history',
    base:'/page/',
    routes,
})
router.beforeEach((to, from, next)=>{
    const token = window.localStorage.getItem('page_builder_token')
    if(!store.state.curUserInfo.id&&token){
        axios.get('/checkToken')
        .then((res)=>{
            store.state.curUserInfo.id = res.data.data.userId
            store.state.curUserInfo.name = res.data.data.userName
        }).then(()=>{
            next()
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else{next()}
})
export default router
