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
        allowToVote: true,
        online: true,
        verified: true,
        eventCoOrganisator: false
      },
      {
        uid: 23456,
        username: '0m3gaC0d3',
        email: 'technoutz@gmail.com',
        public_name: 'Wolf Peterchens Mondfahrt',
        allowToVote: false,
        online: false,
        verified: true,
        eventCoOrganisator: false
      },
      {
        uid: 34567,
        username: 'FailXSiegen',
        email: 'failX@fail2000.com',
        public_name: 'Herr Felix Mann',
        allowToVote: true,
        online: true,
        verified: true,
        eventCoOrganisator: true
      },
      {
        uid: 45678,
        username: 'Testdummy2000',
        email: 'dumm@duemmer.com',
        public_name: 'Pending Test Visitor',
        allowToVote: false,
        online: true,
        verified: true,
        eventCoOrganisator: false
      },
      {
        uid: 45678,
        username: 'Testdummy2000',
        email: 'dumm@duemmer.com',
        public_name: 'Pending Test Member',
        allowToVote: true,
        online: true,
        verified: false,
        eventCoOrganisator: false
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
