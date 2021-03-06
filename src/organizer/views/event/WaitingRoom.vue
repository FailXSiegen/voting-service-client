<template>
  <div class="waitingroom-container">
    <slot name="alerts"></slot>
    <app-navigation :eventUsers="eventUsers" :eventRecord="eventRecord" />
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 py-3 order-1 order-lg-2">
          <h1>{{ headline }}</h1>
          <hr />
          <div class="form-group">
            <label for="filterByUsername">Filter für Benutzernamen</label>
            <input
              type="text"
              class="form-control"
              id="filterByUsername"
              value=""
              placeholder="Filtern nach Benutzernamen"
              v-model="filterByUsername"
              @input="onFilter"
            />
          </div>
          <div
            class="filter-result"
            v-if="filteredEventUsers && filterByUsername"
          >
            <app-pending-users
              v-if="eventUsers"
              :eventUsers="filteredEventUsers"
              :eventRecord="eventRecord"
              :sortParam="sortParam"
              @onSort="sortTable"
            />
          </div>
          <hr />
          <app-pending-users
            v-if="eventUsers"
            :eventUsers="sortedPendingUsers"
            :eventRecord="eventRecord"
            :sortParam="sortParam"
            @onSort="sortTable"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppNavigation from '@/organizer/components/events/detail/Navigation'
import AppPendingUsers from '@/organizer/components/events/detail/PendingUsers'
import { addSuccessMessage } from '@/frame/lib/alert-helper'
import { fetchEventBySlug } from '@/user/api/fetch/event'
import {
  EVENT_USER_LIFE_CYCLE_SUBSCRIPTION,
  NEW_EVENT_USER_SUBSCRIPTION,
  UPDATE_EVENT_USER_ACCESS_RIGHTS_SUBSCRIPTION
} from '@/frame/api/graphql/gql/subscriptions'
import { EVENT_USERS_BY_EVENT } from '@/organizer/api/graphql/gql/queries'

export default {
  props: {
    eventSlug: {
      type: String
    }
  },
  components: {
    AppNavigation,
    AppPendingUsers
  },
  apollo: {
    eventUsers: {
      pollInterval: 5000,
      query: EVENT_USERS_BY_EVENT,
      variables () {
        return {
          eventId: this.eventRecord.id
        }
      }
    },
    $subscribe: {
      updateEventUserAccessRights: {
        query: UPDATE_EVENT_USER_ACCESS_RIGHTS_SUBSCRIPTION,
        result ({ data }) {
          const {
            eventUserId,
            eventId,
            verified,
            allowToVote,
            voteAmount
          } = data.updateEventUserAccessRights
          if (parseInt(eventId) !== this.eventRecord.id) {
            return
          }
          const eventUser = this.eventUsers.find(user => {
            return user.id === eventUserId
          })
          if (!eventUser) {
            return
          }
          eventUser.verified = verified
          eventUser.allowToVote = allowToVote
          eventUser.voteAmount = voteAmount
          addSuccessMessage(
            'Erfolg',
            'Die Rechte des Nutzers wurden erfolgreich angepasst.'
          )
        }
      },
      newEventUser: {
        query: NEW_EVENT_USER_SUBSCRIPTION,
        result ({ data }) {
          if (parseInt(data.newEventUser.eventId) !== this.eventRecord.id) {
            return
          }

          this.eventUsers.push({ ...data.newEventUser })
          addSuccessMessage(
            'Hallöchen',
            'Ein neuer User ist dem Waitingroom beigetreten.'
          )
        }
      },
      eventUserLifeCycle: {
        query: EVENT_USER_LIFE_CYCLE_SUBSCRIPTION,
        result ({ data }) {
          let eventUserFound = false
          if (data.eventUserLifeCycle) {
            const eventUserId = data.eventUserLifeCycle.eventUserId
            this.eventUsers.forEach(eventUser => {
              if (eventUserId === eventUser.id) {
                eventUserFound = true
                eventUser.online = data.eventUserLifeCycle.online
              }
            })
            if (!eventUserFound && data.eventUserLifeCycle.username) {
              this.eventUsers.push({ ...data.eventUserLifeCycle })
            }
          }
        }
      }
    }
  },
  async created () {
    document.title = 'Warteraum - digitalwahl.org'
    const response = await fetchEventBySlug(this.eventSlug)
    if (
      response === null ||
      response.success === false ||
      response.event.organizerId !== this.$store.getters.getCurrentUserId
    ) {
      await this.$router.push('/admin/events')
    }
    this.eventRecord = response.event
  },
  data () {
    return {
      headline: 'Warteraum',
      eventRecord: {},
      eventUsers: [],
      filteredEventUsers: [],
      filterByUsername: '',
      sortParam: 'createDatetime',
      sortOrderInvert: false
    }
  },
  methods: {
    sortTable (sortProperty) {
      if (sortProperty === this.sortParam) {
        this.sortOrderInvert = !this.sortOrderInvert
      }
      this.sortParam = sortProperty
    },
    onFilter () {
      if (!this.eventUsers) {
        return []
      }
      this.filteredEventUsers = this.eventUsers.filter(eventUser => {
        return (
          !eventUser.verified &&
          eventUser.username.includes(this.filterByUsername)
        )
      })
    }
  },
  computed: {
    pendingUsers () {
      if (!this.eventUsers) {
        return []
      }
      return this.eventUsers.filter(eventUser => {
        return !eventUser.verified
      })
    },
    sortedPendingUsers: function () {
      if (!this.eventUsers) {
        return []
      }
      const sortPendingUsers = this.eventUsers.filter(eventUser => {
        return !eventUser.verified
      })
      const sortedArray = sortPendingUsers.sort((a, b) =>
        a[this.sortParam] > b[this.sortParam]
          ? -1
          : a[this.sortParam] < b[this.sortParam]
            ? 1
            : 0
      )
      if (this.sortOrderInvert) {
        sortedArray.reverse()
      }
      return sortedArray
    }
  }
}
</script>
