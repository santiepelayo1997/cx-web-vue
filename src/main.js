import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap';

import './assets/custom.scss'

//import 'vue-awesome/icons/flag'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.component('v-icon', Icon)

Vue.use(require('vue-moment'));

Vue.component('card', {
  template: '#card-template'
})
//import material-icons
import 'material-icons/iconfont/material-icons.css';

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic) {
    if (window.localStorage.getItem('currentUser') == undefined) { //check session here
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      //check if user has access
      next()
    }
  } else {
    next()
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
