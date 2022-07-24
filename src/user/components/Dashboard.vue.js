import { localize } from '@/frame/lib/localization-helper'
import {
  addDangerMessage,
  addSuccessMessage,
  addWarnMessage
} from '@/frame/lib/alert-helper'
import {
  POLL_LIFE_CYCLE_SUBSCRIPTION,
  UPDATE_EVENT_USER_ACCESS_RIGHTS_SUBSCRIPTION
} from '@/frame/api/graphql/gql/subscriptions'
import { POLLS_RESULTS } from '@/frame/api/graphql/gql/queries'
import {
  ACTIVE_POLL_EVENT_USER,
  EVENT_USER_BY_ID
} from '@/user/api/graphql/gql/queries'
import AppModalPoll from '@/user/components/modal/Poll'
import AppModalPollResult from '@/user/components/modal/PollResult'
import AppResults from '@/organizer/components/events/detail/ResultsListing'
import { onLogout as apolloOnLogout, client } from '@/vue-apollo'
import { CREATE_POLL_SUBMIT_ANSWER } from '@/user/api/graphql/gql/mutations'
import $ from 'jquery'
import ZoomFrame from '@/user/components/video-conference/ZoomFrame.vue'
export default {
  components: {
    AppModalPoll,
    AppModalPollResult,
    AppResults,
    ZoomFrame
  },
  props: {
    eventRecord: {
      type: Object,
      required: true
    }
  },
  apollo: {
    eventUser: {
      query: EVENT_USER_BY_ID,
      variables () {
        return {
          id: this.$store.getters.getCurrentUserId
        }
      },
      result ({ data }) {
        if (data === 'undefined') {
          this.onLogout()
        }
        if (parseInt(data.eventUser.eventId) !== this.eventRecord.id) {
          this.onLogout()
          addWarnMessage(
            'Achtung',
            'Es liegt ein Fehler vor. Bitte melden Sie sich ab und danach wieder neu ein.'
          )
        }
      }
    },
    activePollEventUser: {
      query: ACTIVE_POLL_EVENT_USER,
      variables () {
        return {
          eventId: this.eventRecord.id
        }
      },
      result ({ data }) {
        if (
          data.activePollEventUser &&
          data.activePollEventUser.poll &&
          data.activePollEventUser.pollUserVoted.findIndex(
            (x) => x.eventUserId === this.eventUser.id
          ) === -1
        ) {
          this.poll = data.activePollEventUser.poll
          this.pollState = data.activePollEventUser.state
          this.pollResultId = data.activePollEventUser.pollResultId
          this.voteCounter = 1
        } else if (data.activePollEventUser && data.activePollEventUser.poll) {
          this.poll = 'voted'
        }
      }
    },
    pollResult: {
      query: POLLS_RESULTS,
      variables () {
        return {
          eventId: this.eventRecord.id,
          page: 0,
          pageSize: 1
        }
      },
      result ({ data }) {
        if (data.pollResult && data.pollResult.length > 0) {
          this.lastPollResult = data.pollResult[0]
        }
        if (data.pollResult && data.pollResult.length === 1) {
          this.showMoreEnabled = true
        }
      }
    },
    $subscribe: {
      updateEventUserAccessRights: {
        query: UPDATE_EVENT_USER_ACCESS_RIGHTS_SUBSCRIPTION,
        variables () {
          return {
            eventUserId: this.$store.getters.getCurrentUserId
          }
        },
        result ({ data }) {
          this.eventUser.verified = data.updateEventUserAccessRights.verified
          this.eventUser.allowToVote =
            data.updateEventUserAccessRights.allowToVote
          this.eventUser.voteAmount =
            data.updateEventUserAccessRights.voteAmount
          addSuccessMessage(
            'Statusänderung',
            '<p>Ihr Status wurde aktualisiert</p><a class="btn btn-primary btn-block my-3" id="anchorLink" href="#">Änderung anschauen</a>'
          )
        }
      },
      pollLifeCycle: {
        query: POLL_LIFE_CYCLE_SUBSCRIPTION,
        variables () {
          return {
            eventId: this.eventRecord.id
          }
        },
        result ({ data }) {
          if (data.pollLifeCycle.poll) {
            if (
              typeof this.eventUser.id === 'undefined' ||
              isNaN(this.eventUser.id)
            ) {
              this.reloadPage()
            }

            if (this.$refs.pollModal) {
              this.$refs.pollModal.close()
            }
            this.poll = data.pollLifeCycle.poll
          }
          if (data.pollLifeCycle.pollResultId) {
            this.pollResultId = data.pollLifeCycle.pollResultId
          }
          if (data.pollLifeCycle.state === 'closed') {
            if (this.openMeeting) {
              this.openModalResult = true
            }
            this.$apollo.queries.pollResult.refetch()
            this.showMoreEnabled = true
            this.page = 0
            this.voteCounter = 1
            if (this.$refs.pollModal) {
              this.$refs.pollModal.close()
            }
          }
          this.pollState = data.pollLifeCycle.state
        }
      }
    }
  },
  created () {
    document.title = 'digitalwahl.org'
  },
  mounted () {
    console.log(client)
    /* @ToDo - Websocket connection lost */
    // const self = this
    // wsLink.subscriptionClient.on('disconnected', () => {
    //   self.overlayError = true
    //   self.eventUser.online = false
    // })
    // wsLink.subscriptionClient.on('connected', () => {
    //   self.overlayError = false
    //   self.eventUser.online = true
    // })
    // wsLink.subscriptionClient.on('reconnected', () => {
    //   self.overlayError = false
    //   self.eventUser.online = true
    // })

    $(function () {
      $('body, html').on('click', '#anchorLink', function () {
        $([document.documentElement, document.body]).animate(
          {
            scrollTop: $('#userInformation').offset().top - 110
          },
          200,
          function () {
            $('#userInformation').addClass('pulse')
            setTimeout(function () {
              $('#userInformation').removeClass('pulse')
            }, 3000)
          }
        )
      })
    })
  },
  data () {
    return {
      eventUser: null,
      poll: null,
      pollResultId: null,
      openModal: true,
      openModalResult: false,
      pollState: 'closed',
      activePollEventUser: {},
      pollResult: [],
      lastPollResult: {},
      page: 0,
      pageSize: 10,
      showMoreEnabled: false,
      voteCounter: 1,
      overlayError: false,
      openMeeting: false,
      dashboardForeground: false
    }
  },
  computed: {
    existActivePoll () {
      return this.poll && this.pollState !== 'closed'
    }
  },
  methods: {
    closeResultModal () {
      this.openModalResult = false
    },
    showMorePollResults () {
      // Fetch more data and transform the original result
      this.$apollo.queries.pollResult.fetchMore({
        // New variables
        variables: {
          eventId: this.eventRecord.id,
          page: this.page,
          pageSize: this.pageSize
        },
        // Transform the previous result with new data
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newResults = fetchMoreResult.pollResult
          if (!Array.isArray(newResults)) {
            return false
          }
          this.showMoreEnabled = true
          if (this.page === 0) {
            newResults.shift()
          }
          this.pollResult.push(...newResults)
          if (newResults.length < this.pageSize) {
            this.showMoreEnabled = false
          }
          this.page++
          return true
        }
      })
    },
    async onLogout () {
      await apolloOnLogout(this.$apollo.provider.defaultClient)
      if (this.eventRecord.slug) {
        this.eventUser = {}
        window.location = '/' + this.eventRecord.slug
      } else {
        this.eventUser = {}
        window.location = '/'
      }
    },
    async reloadPage () {
      location.reload()
    },
    async submitPoll (pollSubmitAnswerInput) {
      pollSubmitAnswerInput.pollResultId = this.pollResultId
      const answer = {}
      Object.assign(answer, pollSubmitAnswerInput)
      let answerCounter = 1
      if (
        pollSubmitAnswerInput.answerContents &&
        pollSubmitAnswerInput.answerContents.length > 0
      ) {
        for await (const pollAnswer of pollSubmitAnswerInput.answerContents) {
          const multipleAnswer = {}
          Object.assign(multipleAnswer, pollSubmitAnswerInput)
          multipleAnswer.answerContent = pollAnswer
          multipleAnswer.possibleAnswerId = null
          multipleAnswer.voteCycle = this.voteCounter
          multipleAnswer.answerItemLength =
            pollSubmitAnswerInput.answerContents.length
          multipleAnswer.answerItemCount = answerCounter
          delete multipleAnswer.answerContents
          delete multipleAnswer.possibleAnswerIds
          await this.submitAnswer(
            multipleAnswer,
            answerCounter,
            this.voteCounter
          )
          answerCounter++
        }
      } else {
        delete answer.answerContents
        delete answer.possibleAnswerIds
        answer.answerItemLength = 1
        answer.answerItemCount = 1
        await this.submitAnswer(answer, answerCounter, this.voteCounter)
      }
      this.voteCounter++
    },
    async submitAnswer (answer, answerCounter, voteCounter) {
      this.$apollo
        .mutate({
          mutation: CREATE_POLL_SUBMIT_ANSWER,
          variables: {
            input: answer
          }
        })
        .then((response) => {
          if (
            voteCounter === this.eventUser.voteAmount ||
            this.eventRecord.multivoteType === 2 ||
            answer.multivote
          ) {
            if (this.pollState === 'new') {
              this.pollState = 'voted'
            }
            this.voteCounter = 1
          }
        })
        .catch((error) => {
          addDangerMessage('Fehler', 'Die Stimmenabgabe war nicht erfolgreich')
          console.error(error)
        })
    },
    onJoinMeeting () {
      this.openMeeting = true
    },
    onToggleVideoConference () {
      if (!this.dashboardForeground) {
        $('body').addClass('zoom-hidden')
        $('#zmmtg-root').addClass('hidden').hide()
      } else {
        $('body').addClass('zoom-show')
        $('#zmmtg-root').removeClass('hidden').show()
      }
      this.dashboardForeground = !this.dashboardForeground
    },
    localize (path) {
      return localize(path, this.$store.state.language)
    }
  }
}
