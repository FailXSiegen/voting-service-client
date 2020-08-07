import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: {},
    authStatus: false,
    language: 'de_DE',
    views: [
      {
        title: 'Articles',
        route: '/articles',
        icon: require('@/assets/icons/articles.png')
      },
      {
        title: 'Manufacturers',
        route: '/manufacturers',
        icon: require('@/assets/icons/manufacturers.png')
      },
      {
        title: 'Media',
        route: '/media',
        icon: require('@/assets/icons/medias.png')
      }
    ],
    pagination: {
      itemsPerPage: 2,
      maximumNumberOfLinks: 5
    },
    alerts: []
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.authStatus,
    user: state => state.user
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
      console.log(state.token)
    },
    LOGIN_USER (state, user) {
      state.authStatus = true
      state.user = { ...user }
    },
    LOGOUT_USER (state) {
      state.authStatus = ''
      state.token = '' && localStorage.removeItem('apollo-token')
    }
  },
  actions: {
    async login ({ commit, dispatch }, authDetails) {
      const clientId = process.env.VUE_APP_CLIENT_ID
      const host = process.env.VUE_APP_API_HOST
      const url = host + '/auth'
      try {
        const response = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({
            clientId: clientId,
            ...authDetails
          })
        })
        response.json().then(data => {
          console.log(data)
          commit('SET_TOKEN', data.access_token)
          localStorage.setItem('apollo-token', data.access_token)
        })
      } catch (e) {
        console.log(e)
      }
    },
    async logOut ({ commit, dispatch }) {
      commit('LOGOUT_USER')
    }
  }
})
