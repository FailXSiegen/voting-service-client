import { localize } from '@/frame/lib/localization-helper'
import AppUserLogin from '@/user/components/Login'
import AppUserDashboard from '@/user/components/Dashboard'
import { fetchEventBySlug } from '@/user/api/fetch/event'
import { wsLink } from '@/vue-apollo'

export default {
  props: {
    eventSlug: {
      type: String
    }
  },
  components: {
    AppUserLogin,
    AppUserDashboard
  },
  async created () {
    const response = await fetchEventBySlug(this.eventSlug)
    if (response === null || response.success === false) {
      // @todo move this to router function. Route validation should not reside here.
      await this.$router.push('/')
    }
    this.eventRecord = response.event
    if (this.$store.getters.isLoggedIn) {
      this.userRole = this.$store.getters.getCurrentUserRole
      document.title = 'Login - digitalwahl.org'
    }
    // Terminate websocket connection, if the user change the tab.
    document.addEventListener('visibilitychange', (event) => {
      if (document.visibilityState !== 'visible') {
        console.warn('Tab is inactive. Now terminating websocket connection.')
        wsLink.client.dispose()
      }
    })
    // Fetch user record if already logged in.
    if (this.$store.getters.isLoggedIn && this.$store.getters.getCurrentUserRole === 'event-user') {
      this.component = 'AppUserDashboard'
    }
    this.allowToRender = true
  },
  data () {
    return {
      eventRecord: null,
      component: 'AppUserLogin',
      allowToRender: false,
      userRole: ''
    }
  },
  methods: {
    localize (path) {
      return localize(path, this.$store.state.language)
    },
    async changeComponent (event) {
      this.component = event.component
    },
    async onLogout () {
      this.component = 'AppUserLogin'
    }
  }
}
