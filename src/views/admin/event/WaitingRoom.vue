<template>
  <div class="waitingroom-container container-fluid">
    <div class="row">
      <div class="col-12 col-md-3 bg-dark text-white py-3 order-2 order-lg-1">
        <app-navigation :eventRecord="eventRecord" />
      </div>
      <div class="col-12 col-md-9 py-3 order-1 order-lg-2">
        <h1>{{ headline }}</h1>
        <hr>
        <app-pending-users :eventRecord="eventRecord" />
      </div>
    </div>
  </div>
</template>

<script>

import AppNavigation from '@/components/events/event/Navigation'
import AppPendingUsers from '@/components/events/event/PendingUsers'

export default {
  created () {
    this.eventRecord = this.$route.params.eventRecord
  },
  components: {
    AppNavigation,
    AppPendingUsers
  },
  data () {
    return {
      headline: 'Warteraum',
      eventRecord: []
    }
  }
}
</script>
