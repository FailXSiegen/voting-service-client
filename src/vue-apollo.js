import { logErrorMessages } from '@vue/apollo-util'
import { onError } from 'apollo-link-error'
import { handleGraphQlErrors } from './frame/error/handler/apollo-error-handler'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { jwtDecode } from '@/frame/lib/jwt-util'
import router from '@/router'
import { refreshLogin } from '@/frame/api/fetch/auth'
import { getCurrentUnixTimeStamp } from '@/frame/lib/time-stamp'
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split, ApolloLink } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { sseLink } from './sse-link'

export const AUTH_TOKEN = 'apollo-token'

const headers = { authorization: getAuth() }

const httpLink = new HttpLink({ uri: process.env.VUE_APP_GRAPHQL_ENDPOINT, headers })

// eslint-disable-next-line
const refreshTokenLink = new TokenRefreshLink({
  isTokenValidOrUndefined: () => {
    const token = localStorage.getItem(AUTH_TOKEN)
    if (token === null) {
      router.push('/').catch(() => {})
    }
    const decodedToken = jwtDecode(token)
    return decodedToken.payload.exp > getCurrentUnixTimeStamp()
  },
  fetchAccessToken: () => {
    return refreshLogin()
  },
  handleFetch: async accessToken => {
    localStorage.setItem(AUTH_TOKEN, accessToken)
    await apolloProvider.defaultClient.cache.reset()
  },
  handleResponse: (operation, accessTokenField) => async response => {
    return {
      access_token: response.token
    }
  },
  handleError: err => {
    console.error(err)
  }
})

const errorLink = onError(error => {
  if (typeof error !== 'undefined') {
    if (error.graphQLErrors) {
      handleGraphQlErrors(error)
      onResetLocalStorage()
    }
    logErrorMessages(error)
  }
})

// combine http and sse link
const splitLink = split(({ query }) => {
  const { kind, operation } = getMainDefinition(query)
  return kind === 'OperationDefinition' && operation === 'subscription'
}, sseLink, httpLink)

export const defaultClient = new ApolloClient({
  link: ApolloLink.from([
    // refreshTokenLink, errorLink, splitLink
    errorLink, splitLink
  ]),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

Vue.use(VueApollo)

function getAuth () {
  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem(AUTH_TOKEN)
    return `Bearer ${token}`
  }
  return ''
}

export default apolloProvider

export async function onLogin (apolloClient, token) {
  if (typeof localStorage !== 'undefined' && token) {
    localStorage.setItem(AUTH_TOKEN, token)
  }
  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (login)', 'color: orange;', e.message)
  }
}

export async function onLogout (apolloClient) {
  // Force logout (remove refresh token on the server side).
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    cache: 'no-cache',
    credentials: 'include',
    mode: 'cors'
  }
  const endpoint = process.env.VUE_APP_API_HOST + '/logout'
  try {
    await fetch(endpoint, requestOptions)
  } catch (error) {
    console.error(error)
  }
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN)
  }
}

export async function onResetLocalStorage () {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN)
  }
}
