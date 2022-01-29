// import './style.css'
// document.getElementById('app').innerHTML = 'Hello webpack.';

// 导入 Vue 框架
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
// 导入 app.vue 组件
import App from './app.vue';

Vue.use(VueRouter);
Vue.use(Vuex);

const Routers = [

    // 以下写法 webpack 会把每一个路由都打包为一个 js 文件，在请求到该页面时，才去加载这个页面的 js ，也就是异步实现的 懒加载 (按需加载)。
    // 好处：不需要在打开首页的时候就把所有的页面内容全部加载进来，只有访问时才加载。
    {
        path: '/index',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/about',
        meta: {
            title: '关于'
        },
        component: (resolve) => require(['./views/about.vue'], resolve)
    },
    {
        path: '/user/:id',
        meta: {
            title: '个人主页'
        },
        component: (resolve) => require(['./views/user.vue'], resolve)
    },
    // 路由列表里，可以在最后新加一项，但访问的路径不存在时， "重定向" 到首页
    {
        path: '*',
        redirect: '/index'
    }

    /* // 一次性加载写法
    {
        path: '/index',
        component: require('./views/index.vue')
    } */
];
const RouterConfig = {
    // 使用 HTML5 的 History 路由模式，通过 "/" 设置路径
    // 如果不配置 mode ，就会使用 "#" 来设置路径
    // 开启 History 路由，在生产环境时 服务端 必须进行配置，将所有路由都指向同一个 html ，或设置 404 页面为该 html ，否则刷新时页面会出现 404 。
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);
/* 导航钩子：
beforeEach // 改变前触发
afterEach  // 路由即将改变后触发 */
router.beforeEach((to, from, next) => {
    /*
    导航钩子有 3 个参数 P215
    to   // 即将要进入的目标的路由对象
    from // 当前导航即将要离开的路由对象
    next // 调用该方法后，才能进入下一个钩子 */

    window.document.title = to.meta.title;
    next();
    /*
    next() 方法还可以设置参数
        false // 取消导航
        具体的路径 // 导航到指定的页面

    // 校验时候登录场景，通过 localStorage 来简易判断时候登录
    if (window.localStorage.getItem('token')) {
        next();
    } else {
        next('/login');
    }
    */
});
router.afterEach( route => {
    window.scrollTo(0, 0);
})

const store = new Vuex.Store({
    // vuex 的配置
    state: {
        count: 0,
        list: [1, 5, 8, 10, 30, 50]
    },
    getters: {
        filteredList: state => {
            return state.list.filter(item => item < 10);
        },
        listCount: (state, getters) => {
            return getters.filteredList.length;
        }
    },
    mutations: {
        increment (state, n = 1) {
            state.count += n;
        },
        decrease (state) {
            state.count --;
        }
    },
    actions: {
        increment (context) {
            context.commit('increment');
        },
        asyncIncrement (context) {
            return new Promise(resolve => {
                setTimeout(() => {
                    context.commit('increment');
                    resolve();
                }, 1000)
            });
        }
    }
});

// 创建 Vue 根实例
new Vue ({
    el: '#app',
    router: router,
    store: store,

    /* render: h => h(App) */
    /* // 等同于
    render: function (h) {
        return h(App);
    } */
    // 等同于
    render: h => {
        return h(App);
    }
})
