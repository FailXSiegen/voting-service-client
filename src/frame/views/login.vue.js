import { localize } from '@/frame/lib/localization-helper'
import { login } from '@/frame/api/fetch/auth'
import * as R from 'ramda'
import { onLogin as loginApolloClient } from '@/vue-apollo'
import { fetchEventBySlug } from '@/user/api/fetch/event'
import AppFooter from '@/frame/components/Footer'
import gql from 'graphql-tag'

export default {
  metaInfo: {
    title: 'Einfach die Wahl haben',
    meta: [
      { name: 'description', content: 'Einfach die Wahl haben. Wahlanwendung für gemeinnützige Vereine und Verbände. Jetzt kostenlos nutzen!' }
    ]
  },
  components: {
    AppFooter
  },
  apollo: {
    $subscribe: {
      greetings: {
        query: gql`subscription { greetings }`,
        result ({ data }) {
          console.log(data)
        }
      }
    }
  },
  data () {
    return {
      user: {
        displayName: '',
        username: '',
        password: ''
      },
      eventSlug: ''
    }
  },
  methods: {
    validateInput (parentId) {
      const formInputs = document.querySelectorAll(parentId + ' .form-control')
      for (let i = 0; i < formInputs.length; i++) {
        formInputs[i].classList.add('is-invalid')
      }
    },
    onLoginUser () {
      const loginType = 'organizer'
      login(this.user.username, this.user.password, loginType).then(async (data) => {
        const token = R.path(['token'], data)
        const expiresAt = R.path(['expiresAt'], data)
        await loginApolloClient(this.$apollo.provider.defaultClient, token, expiresAt)
        await this.$store.dispatch('extractUserData')
        await this.$router.push('/admin')
      }).catch((error) => {
        this.validateInput('#organizer-form')
        console.error(error)
      })
    },
    localize (path) {
      return localize(path)
    },
    onLoginById () {
      fetchEventBySlug(this.eventSlug).then(async (data) => {
        if (data.success) {
          window.location.href = '/' + data.event.slug
        } else {
          this.validateInput('#event-form')
        }
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
