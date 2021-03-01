import Vue from 'vue'
import Router from 'vue-router'

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

export default new Router({
    mode:'history',
    routes,
})
