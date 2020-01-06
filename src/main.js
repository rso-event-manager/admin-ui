import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import router from './router'
import { createProvider } from './vue-apollo'

Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
