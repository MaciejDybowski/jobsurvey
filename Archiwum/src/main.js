import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from './plugins/vuetify';
import VueSession from 'vue-session'
var VueCookie = require('vue-cookie');
// Tell Vue to use the plugin
Vue.use(VueCookie);
Vue.use(Vuetify)
Vue.use(VueSession, { persist: true })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify: Vuetify,
  render: h => h(App)
}).$mount('#app')
