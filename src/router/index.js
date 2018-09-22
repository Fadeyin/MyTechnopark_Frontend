import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Meta from 'vue-meta'

/* eslint-disable */
const Index = () => import('@/pages/index')
const Login = () => import('@/pages/login')
const LoginByEmail = () => import('@/pages/login-by-email')
const Profile = () => import('@/pages/profile')
const ChangePassword = () => import('@/pages/change-password')
const Activator = () => import('@/pages/activator')
const ResetPassword = () => import('@/pages/reset-password')
const SignIn = () => import('@/pages/sign-in')
const AdsPage = () => import('@/pages/ads')
const RequestPage = () => import('@/pages/request')
const ChatsPage = () => import('@/pages/chats')
const AdsAdd = () => import('@/components/ads-message/add')

Vue.use(Router)
Vue.use(Meta)
Vue.use(Meta, {
  keyName: 'metaInfo', // the component option name that vue-meta looks for meta info on.
  attribute: 'data-vue-meta', // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: 'data-vue-meta-server-rendered', // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: 'vmid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
})

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters['account/isAuthenticated']) {
    return next()
  }
  next('/ads')
}

const ifMustChangePassword = (to, from, next) => {
  if (store.getters['account/mustChangePassword']) {
    next()
    return
  }
  next('/ads')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters['account/isAuthenticated']) {
    if (store.getters['account/mustChangePassword']) {
      store.commit('setError', 'Необходимо сменить пароль!')
      next('/reset-password')
    } else {
      return next()
    }
  }
  next('/login')
}


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/login',
      name: 'Вход',
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/login-by-email',
      name: 'LoginByEmail',
      component: LoginByEmail,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/sign-ib',
      name: 'Регистрация',
      component: SignIn,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/profile',
      name: 'Профиль',
      component: Profile,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/change-password',
      name: 'ChangePassword',
      component: ChangePassword,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: ResetPassword,
      beforeEnter: ifMustChangePassword
    },
    {
      path: '/activator',
      name: 'Activator',
      component: Activator
    },
    {
      path: '/logout',
      name: 'Logout',
      beforeEnter: (to, from, next) => {
        store.commit('account/logout')
        next('/login')
      }
    },
    {
      path: '/ads',
      name: 'Объявления',
      meta: {
        icon: 'fa-bell-o'
      },
      component: AdsPage,
	  beforeEnter: ifAuthenticated
    },
	{
      path: '/adsadd',
      name: 'Создать объявление',
      meta: {
        icon: 'fa-bell-o'
      },
      component: AdsAdd,
	  beforeEnter: ifAuthenticated
    },
    {
      path: '/request',
      name: 'Заявки',
      meta: {
        icon: 'fa-pencil-square-o'
      },
      component: RequestPage,
	  beforeEnter: ifAuthenticated
    },
    {
      path: '/chats',
      name: 'Чаты',
      meta: {
        icon: 'fa-comments-o'
      },
      component: ChatsPage,
	  beforeEnter: ifAuthenticated
    },
	{
      path: '/Complaints',
      name: 'Жалобы',
      meta: {
        icon: 'fa-pencil-square-o'
      },
	  beforeEnter: ifAuthenticated
    },
	{
      path: '/More',
      name: 'Еще',
      meta: {
        icon: 'fa-comments-o'
      },
	  beforeEnter: ifAuthenticated
    }
  ]
})
/* const routes = [{

const AdsPage = {
  name: 'Объявления'
}
const RequestPage = {
  name: 'Заявки'
}
const ChatsPage = {
  name: 'Чаты'
}
const ComplaintsPage = {
  name: 'Жалобы'
}
const MorePage = {
  name: 'Еще'
}
*/
