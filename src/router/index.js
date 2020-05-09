import Vue from 'vue'
import Router from 'vue-router'
// 导入刚才编写的组件
import Login from '@/components/Login'
import Index from '@/views/index/index'
import AdminManager from '@/views/system/admin/AdminManager'
import RoleManager from '@/views/system/role/RoleManager'
import loginLog from '@/views/system/loginLog'
// import * as process from '../../.eslintrc'
import Test from '@/views/Test'
import GoodsList from '@/views/goods/goods/GoodsList'
import GoodsAdd from '@/views/goods/goods/GoodsAdd'
import UserList from '@/views/user/UserList'
import OrderList from '@/views/order/OrderList'
import OrderEdit from '../views/order/OrderEdit'
import TypeList from '../views/goods/type/TypeList'
import StockList from '../views/goods/stock/StockList'
import RefundList from '../views/refund/RefundList'
import CartInfoList from '../views/shoppingcart/CartInfoList'

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
        name: '管理员列表',
        component: AdminManager
      },
      {
        path: '/roleManager',
        name: '角色管理',
        component: RoleManager
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
        path: '/goods/goodsList',
        name: '商品列表',
        component: GoodsList
      },
      {
        path: '/goods/goodsAdd',
        name: '商品添加',
        component: GoodsAdd
      },
      {
        path: '/loginLog',
        name: '商品修改',
        component: loginLog
      },
      {
        path: '/type/typeList',
        name: '商品类型列表',
        component: TypeList
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
        path: '/order/orderList',
        name: '订单列表',
        component: OrderList
      },
      {
        path: '/order/orderEdit',
        name: '订单修改',
        component: OrderEdit
      },
      {
        path: '/refund/refund',
        name: '退款列表',
        component: RefundList
      },
      {
        path: '/cart/cartInfoList',
        name: '购物车列表',
        component: CartInfoList
      }
    ]
  },
  // ----------------------------------------------------------------------------------------------
  {
    path: '/stock',
    name: '库存',
    component: Index,
    children: [
      {
        path: '/stock/stockList',
        name: '库存列表',
        component: StockList
      }
    ]
  },
  // ----------------------------------------------------------------------------------------------
  {
    path: '/user',
    name: '用户',
    component: Index,
    children: [
      {
        path: '/user/userList',
        name: '用户列表',
        component: UserList
      }
    ]
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
        name: '管理员列表',
        component: AdminManager
      },
      {
        path: '/roleManager',
        name: '角色管理',
        component: RoleManager
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
        path: '/goods/goodsList',
        name: '商品列表',
        component: GoodsList
      },
      {
        path: '/goods/goodsAdd',
        name: '商品添加',
        component: GoodsAdd
      },
      {
        path: '/loginLog',
        name: '商品修改',
        component: loginLog
      },
      {
        path: '/type/typeList',
        name: '商品类型列表',
        component: TypeList
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
        path: '/order/orderList',
        name: '订单列表',
        component: OrderList
      },
      {
        path: '/order/orderEdit',
        name: '订单修改',
        component: OrderEdit
      },
      {
        path: '/refund/refund',
        name: '退款列表',
        component: RefundList
      },
      {
        path: '/cart/cartInfoList',
        name: '购物车列表',
        component: CartInfoList
      }
    ]
  },
  // ----------------------------------------------------------------------------------------------
  {
    path: '/stock',
    name: '库存',
    component: Index,
    children: [
      {
        path: '/stock/stockList',
        name: '库存列表',
        component: StockList
      }
    ]
  },
  // ----------------------------------------------------------------------------------------------
  {
    path: '/user',
    name: '用户',
    component: Index,
    children: [
      {
        path: '/user/userList',
        name: '用户列表',
        component: UserList
      }
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
