import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        isPublic: true,
        requireAdmin: false
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        isPublic: true,
        requireAdmin: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      meta: {
        isPublic: true,
        requireAdmin: false
      }
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('./views/Mainboard.vue'),
      meta: {
        isPublic: false,
        requireAdmin: false
      }
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: () => import('./views/Accounts.vue'),
      meta: {
        isPublic: false,
        requireAdmin: true
      }
    },
    {
      path: '/branches',
      name: 'branches',
      component: () => import('./views/Branches.vue'),
      meta: {
        isPublic: false,
        requireAdmin: true
      }
    },
    {
      path: '/ChangePassword',
      name: 'ChangePassword',
      component: () => import('./views/ChangePassword.vue'),
      meta: {
        isPublic: false,
        requireAdmin: true
      }
    },
    {
      path: '/ItemOverrides',
      name: 'ItemOverrides',
      component: () => import('./views/ItemOverrides.vue'),
      meta: {
        isPublic: false,
        requireAdmin: true
      }
    },
    {
      path: '/Taxes',
      name: 'taxes',
      component: () => import('./views/Taxes.vue'),
      meta: {
        isPublic: false,
        requireAdmin: true
      }
    },
    {
      path: '/Discounts',
      name: 'discounts',
      component: () => import('./views/Discounts.vue'),
      meta: {
        isPublic: false,
        requireAdmin: true
      }
    },
    {
      path: '/DiscountAccess',
      name: 'discountAccess',
      component: () => import('./views/DiscountAccess.vue'),
      meta: {
        isPublic: false,
        requireAdmin: true
      }
    },
    {
      path: '/ExtraChargeType',
      name: 'extrachargetype',
      component: () => import('./views/ExtraChargeType.vue'),
      meta: {
        isPublic: false,
        requireAdmin: true
      }
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('./views/Products.vue'),
      meta: {
        isPublic: false,
        requireAdmin: true
      }
    },
    {
      path: '/pricelist',
      name: 'pricelist',
      component: () => import('./views/PriceList.vue'),
      meta: {
        isPublic: false,
        requireAdmin: true
      }
    },
    {
      path: '/paymentchannels',
      name: 'paymentchannels',
      component: () => import('./views/PaymentChannels.vue'),
      meta: {
        isPublic: false,
        requireAdmin: true
      }
    },
    {
      path: '/terminals',
      name: 'terminals',
      component: () => import('./views/Terminals.vue'),
      meta: {
        isPublic: false,
        requireAdmin: true
      }
    },
    {
      path: '/UserGroups',
      name: 'UserGroups',
      component: () => import('./views/UserGroups.vue'),
      meta: {
        isPublic: false,
        requireAdmin: true
      }
    },
    {
      path: '/Users',
      name: 'Users',
      component: () => import('./views/Users.vue'),
      meta: {
        isPublic: false,
        requireAdmin: true
      }
    },
    {
      path: '/licenses',
      name: 'licenses',
      component: () => import('./views/Licenses.vue'),
      meta: {
        isPublic: false,
        requireAdmin: true
      }
    }

  ]
})
