<template>
  <div class="container-verified-user" v-if="eventUsers">
    <h3>Benutzer: {{ eventUsers.length }}</h3>
    <ul class="allowed-users list-group">
      <li v-for="(user, index) in eventUsers" :key="index" class="list-group-item my-2 border">
        <div class="list-group-content">
          <div class="list-group-info">
            <div class="user-information">
              <div class="mb-1">
                <span class="badge badge-success badge-pill status-indicator" v-if="user.online">online</span>
                <span class="badge badge-danger badge-pill status-indicator" v-else>offline</span>
                <h5>{{ user.publicName }}</h5>
                <p class="text-success small" v-if="user.allowToVote">
                  {{ localize('view.event.user.member') }}</p>
                <span class="text-info small" v-else>{{ localize('view.event.user.visitor') }}</span>
              </div>
            </div>
            <p class="mb-0">{{ user.username }} <span
              v-if="user.voteAmount">- Stimmen: {{ user.voteAmount }}</span>  </p>
          </div>
          <div class="d-flex justify-content-center align-items-center btn-group">
            <button v-if="!user.allowToVote" v-on:click="updateToParticipant(user)" class="h-100 btn btn-success m-2">
              {{ localize('view.event.user.setTo') }}
              {{ localize('view.event.user.member') }}
            </button>
            <button v-else-if="user.allowToVote" v-on:click="updateUserToGuest(user)" class="h-100 btn btn-info m-2">
              {{ localize('view.event.user.setTo') }}
              {{ localize('view.event.user.visitor') }}
            </button>
            <router-link :to="{ name: 'UpdateEventUser', params: { eventUserRecord: user } }"
                         class="h-100 btn float-xl-right btn-warning d-flex justify-content-center align-items-center">
              <i class="bi-pencil align-middle"></i>
            </router-link>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { localize } from '@/helper/localization-helper'
import { UPDATE_USER_TO_GUEST, UPDATE_USER_TO_PARTICIPANT } from '@/graphql/mutations'

export default {
  props: {
    eventRecord: {
      type: Object,
      required: true
    },
    eventUsers: {
      type: Array,
      required: true
    }
  },
  methods: {
    localize (path) {
      return localize(path)
    },
    updateUserToGuest (user) {
      const eventUserId = user.id
      this.$apollo.mutate({
        mutation: UPDATE_USER_TO_GUEST,
        variables: { eventUserId }
      }).then(() => {
        user.voteAmount = 0
      }).catch((error) => {
        console.error(error)
      })
    },
    updateToParticipant (user) {
      const eventUserId = user.id
      this.$apollo.mutate({
        mutation: UPDATE_USER_TO_PARTICIPANT,
        variables: { eventUserId }
      }).then(() => {
        user.voteAmount = 1
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>

<style scoped>
.list-group-item:hover {
  background-color: lightgrey;
}

.status-indicator {
  font-weight: initial;
  font-size: .7rem;
  margin-top: -2px;
}

h5 {
}

.list-group-content {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-content: center;
  margin-bottom: 1rem;
  flex-direction: column;
}

.list-group-info {
  display: flex;
  flex-direction: column;
  padding-right: 1.5rem;
}

@media all and (min-width: 567px) {
  .list-group-content {
    justify-content: space-between;
    flex-direction: row;
  }

  .list-group-info {
    flex-direction: column;
  }
}
</style>
