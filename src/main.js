import Vue from 'vue'
import VueMeta from 'vue-meta'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import apolloProvider from '@/vue-apollo.js'
import 'bootstrap'
import '@/assets/scss/main.scss'
Vue.config.productionTip = false
Vue.use(VueMeta, {
  keyName: 'metaInfo'
})
// Fetch user data, if present.
store.dispatch('extractUserData').catch((error) => {
  console.error('Could not fetch user data. Please reload the page.', error)
})

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
