import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    language: 'de_DE',
    views: [
      {
        title: 'Übersicht',
        route: '/admin'
      },
      {
        title: 'Veranstaltungen',
        route: '/admin/events'
      }
    ],
    pagination: {
      itemsPerPage: 2,
      maximumNumberOfLinks: 5
    },
    alerts: [],
    users: [
      {
        uid: 1234,
        username: 'habundloot',
        email: 'mo@habundloot.de',
        public_name: 'Moritz Preuß',
        allow_to_vote: true,
        online: true,
        verified: true,
        event_coorganisator: false
      },
      {
        uid: 23456,
        username: '0m3gaC0d3',
        email: 'technoutz@gmail.com',
        public_name: 'Wolf Peterchens Mondfahrt',
        allow_to_vote: false,
        online: false,
        verified: true,
        event_coorganisator: false
      },
      {
        uid: 34567,
        username: 'FailXSiegen',
        email: 'failX@fail2000.com',
        public_name: 'Herr Felix Mann',
        allow_to_vote: true,
        online: true,
        verified: true,
        event_coorganisator: true
      },
      {
        uid: 45678,
        username: 'Testdummy2000',
        email: 'dumm@duemmer.com',
        public_name: 'Pending Test Visitor',
        allow_to_vote: false,
        online: true,
        verified: true,
        event_coorganisator: false
      },
      {
        uid: 45678,
        username: 'Testdummy2000',
        email: 'dumm@duemmer.com',
        public_name: 'Pending Test Member',
        allow_to_vote: true,
        online: true,
        verified: false,
        event_coorganisator: false
      }
    ]
  },
  getters: {
    verifiedUsers: state => {
      return state.users.filter(user => user.verified)
    },
    pendingUsers: state => {
      return state.users.filter(user => !user.verified)
    }
  },
  mutations: {},
  actions: {}
})
