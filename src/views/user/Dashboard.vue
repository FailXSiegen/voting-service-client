<template>
  <div class="user-dashboard-container container-fluid bg-white min-vh-100">
    <div v-if="!this.user.verified" class="row min-vh-100 justify-content-center align-items-center">
      <div class="col-12 text-center">
        <i class="bi-arrow-repeat bi--spin bi--4xl mb-3"></i>
        <h1>{{ localize('view.user.pending.tankYou') }}</h1>
        <p>{{ localize('view.user.pending.bodyText') }}</p>
      </div>
    </div>
    <div v-else class="row min-vh-100 justify-content-center align-items-center">
      <div class="col-12">
        <h1>{{ localize('view.user.verified.welcome') }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { localize } from '@/helper/localization-helper'

export default {
  data () {
    return {
      user: {
        uid: null,
        create_datetime: null,
        event_id: null,
        username: '',
        email: '',
        password: '',
        publicName: '',
        allowtoVote: true,
        online: true,
        verified: false,
        identifier: null,
        eventCoOrganisator: false
      }
    }
  },
  methods: {
    localize (path) {
      return localize(path, this.$store.state.language)
    }
  }
}
</script>
