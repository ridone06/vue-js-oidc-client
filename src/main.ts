import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios'
import AuthService from '@/services/auth.service';

Vue.config.productionTip = false;

const globalData: any = {
  isAuthenticated: false,
  user: null as any,
  auth: new AuthService()
}

const globalMethods: any = {
  authenticate: async function (returnPath: string): Promise<void> {
    const user = await this.$root.getUser(); //see if the user details are in local storage
    if (!!user) {
      this.isAuthenticated = true;
      this.user = user;
    } else {
      await this.$root.login(returnPath);
    }
  },
  getUser: async function () {
    try {
      let user = await this.auth.getUser();
      return user;
    } catch (err) {
      console.log(err);
    }
  },
  login: function (returnPath: string) {
    returnPath ? this.auth.login(returnPath)
      : this.auth.login();
  }
}

let v = new Vue({
  router,
  data: globalData,
  methods: globalMethods,
  el: '#app',
  template: '<App/>',
  components: { App },
  render: (h) => h(App),
}).$mount('#app');

axios.interceptors.request.use((config) => {
  const user = v.$root.user;
  if (user) {
    const authToken = user.access_token;
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
  }
  return config;
},
  (err) => {
    //What do we do when we get errors?
  });