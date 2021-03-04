import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Callback from './views/Callback.vue';
import BackChannelLogout from './views/BackChannelLogout.vue';
import Unauthorized from './views/Unauthorized.vue';

Vue.use(Router);

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        requiresAuth: true
      },
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        requiresAuth: true
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback
    },
    {
      path: '/unauthorized',
      name: 'Unauthorized',
      component: Unauthorized
    },
    {
      path: '/BackChannelLogout',
      name: 'backchannel-logout',
      component: BackChannelLogout
    }
  ],
});

export default router;

router.beforeEach(async (to, from, next) => {
  await Vue.nextTick();

  let app = router.app.$root || { isAuthenticated: false }
  console.log("app.isAuthenticated", app.isAuthenticated);
  if (app.isAuthenticated) {
    //already signed in, we can navigate anywhere
    next()
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    //authentication is required. Trigger the sign in process, including the return URI
    let authenticate = router.app.authenticate;
    authenticate(to.path).then(() => {
      console.log('authenticating a protected url:' + to.path);
      next();
    });
  } else {
    //No auth required. We can navigate
    next()
  }
});