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
const RequestAdd = () => import('@/components/ads-message/addRequest')
const RequestUpdate = () => import('@/pages/UpdateRequest')
const ChatsPage = () => import('@/pages/chats')
const AdsAdd = () => import('@/components/ads-message/add')
const ComplaintsPage = () => import('@/pages/Complaints')
const MorePage= () => import('@/pages/more')
const ComplaintsAdd = () => import('@/components/ads-message/addComplaints')
const ComplaintsUpdate = () => import('@/pages/UpdateComplaints')


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
      component: AdsPage,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/login',
      name: 'Вход',
	  meta: {
        icon: 'menu'
      },
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
      path: '/sign-in',
      name: 'Регистрация',
	  meta: {
        icon: 'menu'
      },
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
        icon: 'dashboard'
      },
      component: AdsPage,
	  beforeEnter: ifAuthenticated
    },
	{
      path: '/adsadd',
      name: 'Создать объявление',
      meta: {
        icon: 'dashboard'
      },
      component: AdsAdd,
	  beforeEnter: ifAuthenticated
    },
    {
      path: '/request',
      name: 'Заявки',
      meta: {
        icon: 'assignment'
      },
      component: RequestPage,
	  beforeEnter: ifAuthenticated
    },
	{
      path: '/request/add',
      name: 'Создать заявку',
      meta: {
        icon: 'assignment'
      },
      component: RequestAdd,
	  beforeEnter: ifAuthenticated
    },
	{
      path: '/request/update/:id&&:title&&:des',
      name: 'редактировать',
      meta: {
        icon: 'assignment'
      },
	  params: { id: 'id', title: 'title', des: 'des'},
      component: RequestUpdate,
	  beforeEnter: ifAuthenticated
    },
    {
      path: '/chats',
      name: 'Чаты',
      meta: {
        icon: 'question_answer'
      },
      component: ChatsPage,
	  beforeEnter: ifAuthenticated
    },
	{
      path: '/complaints',
      name: 'Жалобы',
      meta: {
        icon: 'warning'
      },
	  component: ComplaintsPage,
	  beforeEnter: ifAuthenticated
    },
	{
      path: '/complaints/add',
      name: 'Создать жалобу',
      meta: {
        icon: 'warning'
      },
      component: ComplaintsAdd,
	  beforeEnter: ifAuthenticated
    },
	{
      path: '/complaints/update/:id&&:title&&:des',
      name: 'Редактировать',
      meta: {
        icon: 'warning'
      },
	  params: { id: 'id', title: 'title', des: 'des'},
      component: ComplaintsUpdate,
	  beforeEnter: ifAuthenticated
    },
	{
      path: '/more',
      name: 'Еще',
      meta: {
        icon: 'menu'
      },
	  component: MorePage,
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
