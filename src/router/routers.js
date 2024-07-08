// 引入路由组件
// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Search from '@/pages/Search'
// import Register from '@/pages/Register'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// import GroupOrder from '@/pages/Center/GroupOrder'
// import MyOrder from '@/pages/Center/MyOrder'



// 路由懒加载
// 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
// 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
export default[
    // 一级路由组件
    {
        path:'/home',
        component:()=>import('@/pages/Home'),
        meta:{
            showFooter:true
        }
    },
    {
        path: '/login',
        component:()=>import('@/pages/Login'),
        meta: {
            showFooter: false
        }
    },
    {
        // path: '/search/:keyword',
        path: '/search/:keyword?',
        component: ()=>import('@/pages/Search'),
        meta: {
            showFooter: true
        },
        name:'search'
    },
    {
        path: '/register',
        component: ()=>import('@/pages/Register'),
        meta: {
            showFooter: false
        }
    },
    {
        // 当路由跳转的时候需要携带参数的时候要在path路由配置中书写 占位符 :skuid
        path:'/detail/:skuid?',
        component: ()=>import('@/pages/Detail'),
        meta: {
            showFooter: true
        }

    },
    {
        path:'/addcartsuccess',
        component: ()=>import('@/pages/AddCartSuccess'),
        meta: {
            showFooter: true
        },
        name:'addcartsuccess'
    },
    {
        path:'/shopcart',
        component: ()=>import('@/pages/ShopCart'),
        meta: {
            showFooter: true
        },
        name:'shopcart'
    },
    {
        path:'/trade',
        component: ()=>import('@/pages/Trade'),
        meta: {
            showFooter: true
        },
        name:'trade',
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path == '/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/pay',
        component: ()=>import('@/pages/Pay'),
        meta: {
            showFooter: true
        },
        name:'pay',
        beforeEnter: (to, from, next) => {
            if(from.path == '/trade'){
                next()
            }
            else{
                next(false)
            }
        }
    },
    {
        path:'/paysuccess',
        component: ()=>import('@/pages/PaySuccess'),
        meta: {
            showFooter: true
        },
        name:'paysuccess'
    },
    {
        path:'/center',
        component: ()=>import('@/pages/Center'),
        meta: {
            showFooter: true
        },
        name:'center',
        // 二级路由组件
        children:[
            {
                path:'myorder',
                component: ()=>import('@/pages/Center/MyOrder')
            },
            {
                path:'grouporder',
                component: ()=>import('@/pages/Center/GroupOrder')
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            },
        ]
    },
    // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页
    {
        path:'/',
        redirect:'/home'
    }
]