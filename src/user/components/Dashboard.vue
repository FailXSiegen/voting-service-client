<template>
  <section class="user-dashboard-container">
    <slot name="alerts"></slot>
    <div
      v-if="overlayError"
      id="overlay"
      class="h-100 w-100 position-fixed d-flex align-items-center align-content-center justify-content-center text-center"
    >
      <span class="content alert alert-danger">
        <h1>Serververbindung unterbrochen</h1>
        <button
          @click="reloadPage"
          class="btn-lg btn btn-info py-2 d-print-none"
        >
          <i class="mr-3 bi bi-arrow-repeat bi--1xl"></i>
          {{ localize('navigation.reload') }}
        </button>
      </span>
    </div>
    <div
      v-if="eventUser"
      class="container position-relative bg-white min-vh-100 pt-5 pt-md-0"
    >
      <div
        v-if="!eventUser.verified"
        class="row min-vh-100 justify-content-center align-items-center d-print-none"
      >
        <div class="col-12 text-center">
          <div
            class="spinner-border mb-5"
            style="width: 3rem; height: 3rem"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
          <h1>{{ localize('view.user.pending.tankYou') }}</h1>
          <h2>
            {{ localize('view.user.pending.loggedInAs') }}
            {{ eventUser.username }}
          </h2>
          <p class="alert alert-info w-auto d-inline-block mt-2">
            {{ localize('view.user.pending.bodyText') }}
          </p>
        </div>
      </div>
      <div
        v-else
        class="row min-vh-100 justify-content-center align-items-center pt-5 pt-md-0"
      >
        <div class="col-12">
          <h1>{{ eventRecord.title }}</h1>
          <h2>
            {{ localize('view.user.verified.welcome') }}
            {{ eventUser.publicName }}
          </h2>
          <p id="userInformation">
            {{ eventUser.username }} -
            <span class="text-success small" v-if="eventUser.allowToVote">
              {{ localize('view.event.user.member') }}</span
            >
            <span class="text-info small" v-else>{{
              localize('view.event.user.visitor')
            }}</span>
            <span v-if="eventUser.allowToVote">
              | Anzahl Stimmen: {{ eventUser.voteAmount }}</span
            >
            <span> | Status: </span>
            <span
              class="badge badge-success badge-pill status-indicator"
              v-if="eventUser.online"
              >online</span
            >
            <span class="badge badge-danger badge-pill status-indicator" v-else
              >offline</span
            >
          </p>
          <hr class="d-print-none" />
          <p class="d-print-none" v-if="eventRecord.description">
            {{ eventRecord.description }}
          </p>
          <hr v-if="!openMeeting && eventRecord.meeting" />

          <button
            @click.prevent="onJoinMeeting"
            v-if="!openMeeting && eventRecord.meeting"
            class="btn btn-primary"
          >
            An Videokonferenz teilnehmen
          </button>

          <div class="meeting" v-if="openMeeting && eventRecord.meeting">
            <div class="container-zoom">
              <div id="zoom-hook"></div>
              <ZoomFrame
                v-if="eventRecord.meeting.credentials"
                :apiKey="eventRecord.meeting.apiKey"
                :apiSecret="eventRecord.meeting.apiSecret"
                :nickname="eventUser.publicName"
                :meetingId="eventRecord.meeting.credentials.id"
                :password="eventRecord.meeting.credentials.password"
                :returnUrl="eventRecord.slug"
              />
              <div
                class="btn btn-primary position-fixed sticky-top mt-2"
                @click.prevent="onToggleVideoConference"
                title="Ansicht wechseln"
              >
                <i class="bi bi-arrow-repeat bi--2xl"></i>
              </div>
            </div>
          </div>

          <hr v-if="!openMeeting && eventRecord.meeting" />
          <hr class="d-print-none" />
          <div class="container-poll-status d-print-none">
            <div
              class="container-poll-voted text-center alert alert-success"
              v-if="this.pollState === 'voted'"
            >
              <i class="bi-check bi--4xl my-3"></i>
              <h2 v-html="localize('view.user.verified.voted')">
                {{ localize('view.user.verified.voted') }}
              </h2>
            </div>
            <div
              class="container-active-poll text-center alert alert-primary"
              role="alert"
              v-if="existActivePoll"
            >
              <i class="bi-arrow-repeat bi--spin bi--4xl my-3"></i>
              <p v-html="localize('view.user.verified.activePoll')">
                {{ localize('view.user.verified.activePoll') }}
              </p>
            </div>
            <div
              class="container-no-active-poll text-center alert alert-warning d-flex justify-content-center align-items-center"
              role="alert"
              v-else
            >
              <p class="mb-0">
                {{ localize('view.user.verified.noActivePoll') }}
              </p>
            </div>
          </div>
          <div class="container-poll-result mt-3" v-if="pollResult">
            <hr class="d-print-none" />
            <app-results :pollResult="pollResult" :eventRecord="eventRecord" />
          </div>
          <app-modal-poll
            v-if="pollState === 'new' && eventUser.allowToVote"
            :identifier="'poll' + poll.id"
            :poll="poll"
            :multivoteType="eventRecord.multivoteType"
            :voteAmount="eventUser.voteAmount"
            :trigger="openModal"
            @onSubmitPoll="submitPoll"
            ref="pollModal"
          />
          <app-modal-poll-result
            v-if="lastPollResult && pollState === 'closed'"
            :identifier="'pollResult' + lastPollResult.id"
            :pollResult="lastPollResult"
            :eventRecord="eventRecord"
            :trigger="openModalResult"
            ref="pollResultModal"
            @onCloseResultModal="closeResultModal"
          />
          <button
            v-if="showMoreEnabled && pollResult"
            class="btn btn-info my-3 mx-auto py-2 d-flex align-items-center d-print-none"
            @click="showMorePollResults"
          >
            <i class="mr-3 bi bi-plus-square-fill bi--2xl"></i>
            {{ localize('view.results.showMore') }}
          </button>
          <p v-if="!showMoreEnabled">
            {{ localize('view.results.noMoreResults') }}
          </p>
        </div>
      </div>
      <button
        @click="onLogout"
        class="logout btn btn-danger py-1 d-flex align-items-center d-print-none"
      >
        <i class="mr-3 bi bi-x-square bi--2xl"></i>
        {{ localize('navigation.logOut') }}
      </button>
      <button
        @click="reloadPage"
        class="reload btn btn-info py-1 d-flex align-items-center d-print-none"
      >
        <i class="mr-3 bi bi-arrow-repeat bi--1xl"></i>
        {{ localize('navigation.reload') }}
      </button>
    </div>
  </section>
</template>

<script>
export { default } from '@/user/components/Dashboard.vue.js'
</script>

<style scoped>
#overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.logout {
  position: absolute;
  top: 15px;
  right: 15px;
}

.reload {
  position: absolute;
  top: 75px;
  right: 15px;
}

.pulse {
  background: rgba(23, 162, 184, 0.15);
  box-shadow: 0 0 0 0 rgba(23, 162, 184, 0.5);
  transform: scale(1);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(23, 162, 184, 0.4);
  }
  30% {
    transform: scale(0.99);
    box-shadow: 0 0 0 10px rgba(23, 162, 184, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(23, 162, 184, 0);
  }
}

.container-zoom {
  width: 70%;
  height: 100%;
}
</style>
