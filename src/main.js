// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import './assets/font-awesome.min.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import VueCordova from 'vue-cordova'
import VueHead from 'vue-head'
import App from './App'
import store from './store'
import router from './router'
import colors from "vuetify/es5/util/colors";


Vue.use(Vuetify, {
  theme: {
    primary: colors.blue.base,
   // secondary: colors.red.lighten4,
   // accent: colors.indigo.base
  }
})
Vue.use(Vuetify, {
  iconfont: 'fa4'
})
Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.use(VueCordova)
Vue.use(VueHead)

// add cordova.js only if serving the app through file://
if (window.location.protocol === 'file:' || window.location.port === '3000') {
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
  head: {
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
      }
    ]
  }
})
