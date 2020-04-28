import Vue from 'vue'
import Router from 'vue-router'
// 导入刚才编写的组件
import Login from '@/components/Login'
import Index from '@/views/index/index'
import adminManager from '@/views/system/admin/adminManager'
import roleManager from '@/views/system/role/roleManager'
import loginLog from '@/views/system/loginLog'
// import * as process from '../../.eslintrc'
import Test from '@/views/Test'

Vue.use(Router)

const routes = [
  {
    path: '/Test',
    name: '测试页面',
    component: Test
  },
  {
    path: '/',
    redirect: '/login2'
  },
  {
    path: '/login2',
    name: '登录页面',
    component: Login
  },
  {
    path: '/index',
    name: '首页',
    component: Index,
    redirect: '/adminManager',
    children: [
      {
        path: '/adminManager',
        name: '管理员管理',
        component: adminManager
      },
      {
        path: '/roleManager',
        name: '角色管理',
        component: roleManager
      },
      {
        path: '/loginLog',
        name: '登录日志',
        component: loginLog
      }
    ]
  },
  // ----------------------------------------------------------------------------------------------
  {
    path: '/goods',
    name: '商品',
    component: Index,
    children: [
      {
        path: '/adminManager',
        name: '商品查询',
        component: adminManager
      },
      {
        path: '/roleManager',
        name: '商品添加',
        component: roleManager
      },
      {
        path: '/loginLog',
        name: '商品修改',
        component: loginLog
      },
      {
        path: '/loginLog',
        name: '商品删除',
        component: loginLog
      }
    ]
  },
  // ----------------------------------------------------------------------------------------------
  {
    path: '/order',
    name: '订单',
    component: Index,
    children: [
      {
        path: '/adminManager',
        name: '订单查询',
        component: adminManager
      },
      {
        path: '/roleManager',
        name: '订单添加',
        component: roleManager
      },
      {
        path: '/loginLog',
        name: '订单修改',
        component: loginLog
      },
      {
        path: '/loginLog',
        name: '订单删除',
        component: loginLog
      }
    ]
  },
  // ----------------------------------------------------------------------------------------------
  {
    path: '/stock',
    name: '库存',
    component: Index
  },
  // ----------------------------------------------------------------------------------------------
  {
    path: '/user',
    name: '用户',
    component: Index
  },
  // ----------------------------------------------------------------------------------------------
  {
    path: '/operation',
    name: '运营',
    component: Index
  },
  // ----------------------------------------------------------------------------------------------
  {
    path: '/count',
    name: '统计',
    component: Index
  },
  // ----------------------------------------------------------------------------------------------
  {
    path: '/finance',
    name: '财务',
    component: Index
  },
  // ----------------------------------------------------------------------------------------------
  {
    path: '/setting',
    name: '设置',
    component: Index
  }

]
// ***********************************************************************************************
const routes2 = [
  {
    path: '/index',
    name: '首页',
    component: Index,
    children: [
      {
        path: '/adminManager',
        name: '管理员管理',
        component: adminManager
      },
      {
        path: '/roleManager',
        name: '角色管理',
        component: roleManager
      },
      {
        path: '/loginLog',
        name: '登录日志',
        component: loginLog
      }
    ]
  },
  // ----------------------------------------------------------------------------------------------
  {
    path: '/goods',
    name: '商品',
    component: Index,
    children: [
      {
        path: '/adminManager',
        name: '商品查询',
        component: adminManager
      },
      {
        path: '/roleManager',
        name: '商品添加',
        component: roleManager
      },
      {
        path: '/loginLog',
        name: '商品修改',
        component: loginLog
      },
      {
        path: '/loginLog',
        name: '商品删除',
        component: loginLog
      }
    ]
  },
  // ----------------------------------------------------------------------------------------------
  {
    path: '/order',
    name: '订单',
    component: Index,
    children: [
      {}
    ]
  },
  // ----------------------------------------------------------------------------------------------
  {
    path: '/stock',
    name: '库存',
    component: Index,
    children: [
      {}
    ]
  },
  // ----------------------------------------------------------------------------------------------
  {
    path: '/user',
    name: '用户',
    component: Index,
    children: [
      {}
    ]
  },
  // ----------------------------------------------------------------------------------------------
  {
    path: '/operation',
    name: '运营',
    component: Index,
    children: [
      {}
    ]
  },
  // ----------------------------------------------------------------------------------------------
  {
    path: '/count',
    name: '统计',
    component: Index,
    children: [
      {}
    ]
  },
  // ----------------------------------------------------------------------------------------------
  {
    path: '/finance',
    name: '财务',
    component: Index,
    children: [
      {}
    ]
  },
  // ----------------------------------------------------------------------------------------------
  {
    path: '/setting',
    name: '设置',
    component: Index,
    children: [
      {}
    ]
  }
]
const router = new Router({
  // model: 'history',
  // base: process.env.BASE_URL,
  routes,
  routes2
})

// 拦截页面，不登录不可操作其他页面
// router.beforeEach((to, from, next) => {
//   // 访问登录页，放行
//   if (to.path === '/login2') return next()
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   // 没有token, 强制跳转到登录页
//   if (!tokenStr) return next('/login2')
//   next()
// })
export default router
