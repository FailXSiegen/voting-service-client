import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    language: 'de_DE',
    views: [
      {
        title: 'Dashboard',
        route: '/'
      },
      {
        title: 'Events',
        route: '/events'
      },
      {
        title: 'Polls',
        route: '/polls'
      }
    ],
    pagination: {
      itemsPerPage: 2,
      maximumNumberOfLinks: 5
    },
    alerts: []
  },
  getters: {},
  mutations: {},
  actions: {}
})
