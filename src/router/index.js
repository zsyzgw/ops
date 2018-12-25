import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Dashboard from '@/components/das'

import BookList from '@/components/book/list'
import BookCategoryList from '@/components/bookcategory/list'

import UserList from '@/components/user/list'
import UserChangePwd from '@/components/user/changepwd'
import UserProfile from '@/components/user/profile'
import navi from '@/components/navi'
import test from '@/components/deploy/test'
import pro from '@/components/project/pro2'
import job from '@/components/deploy/jobs'
import list from   '@/components/deploy/list'c
// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router)

let router = new Router({
// mode: 'history',
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/dashboard',
      leaf: true, // 只有一个节点
      menuShow: true,
      iconCls: 'iconfont icon-home', // 图标样式class
      children: [
        {path: '/dashboard', component: Dashboard, name: '首页', menuShow: true}
      ]
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      //redirect: '/navi',
      leaf: true, // 只有一个节点
      menuShow: true,
      iconCls: 'iconfont icon-home', // 图标样式class
      children: [
        {path: '/navi', component: navi, name: '站点导航', menuShow: true}
      ]
    },





    {
      path: '/',
      component: Home,
      name: '用户管理',
      menuShow: true,
      leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-users', // 图标样式class
      children: [
        {path: '/user/list', component: UserList, name: '用户列表', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '主机管理',
      menuShow: true,
      iconCls: "iconfont icon-yunzhuji",
      children: [
        {path: '/book/list', component: BookList, name: '主机列表', menuShow: true},
        {path: '/book/category', component: BookCategoryList, name: '主机分类', menuShow: true}
      ]
    },

    {
      path: '/',
      component: Home,
      name: '发布管理',
      menuShow: true,
      iconCls: "iconfont icon-chanpinfabu",
      children: [
        {path: '/deploy/test', component: test, name: '测试发布', menuShow: true},
        {path: '/deploy', component: job, name: '上线单', menuShow: true}
      ]
    },



    {
      path: '/',
      component: Home,
      name: '服务管理',
      menuShow: true,
      leaf: true,
      iconCls: 'iconfont icon-02',
      children: [
        {path: '/project/pro', component: pro, name: '项目管理' , menuShow: true}
        ]

    },

    {
      path: '/',
      component: Home,
      name: '设置',
      menuShow: true,
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/user/profile', component: UserProfile, name: '个人信息', menuShow: true},
        {path: '/user/changepwd', component: UserChangePwd, name: '修改密码', menuShow: true}
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.localStorage.getItem('access-user'))
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

export default router
