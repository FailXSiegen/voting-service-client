<template>
  <li class="list-group-item">
    <div class="border p-3">
      <h5 class="mb-1">{{  pollResult.poll.title }} ({{ localize('view.results.type.' + pollResult.type) }}) - {{ pollResult.modifiedDatetime }}</h5>
      <p class="small text-muted">
        {{ localize('view.results.givenVotes') }} {{  pollResult.pollUser.length }} | {{ localize('view.results.voters') }} {{  pollResult.pollUser.length }}
      </p>
      <hr class="divider my-2" />
      <div class="row">
        <div class="col-12 col-md-6">
          <p>{{ localize('view.results.mainResult') }}</p>
          <div class="result-list">
            <ul class="list-group">
              <li v-for="(answer, index) in pollResult.pollAnswer" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
                {{ answer.content }}
                <span class="badge badge-pill" style="background-color: green;color: white;"> {{ answer.amount }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <p>{{ localize('general.member') }}</p>
          <button class="btn btn-primary"
                  type="button"
                  data-toggle="collapse"
                  data-target="#poll-ID-ResultVoters"
                  aria-expanded="false"
                  aria-controls="poll-ID-ResultVoters">
            <i class="bi bi-caret-right-fill"></i>
            {{ localize('view.results.showMemberList') }}
          </button>
          <div class="collapse" id="poll-ID-ResultVoters">
            <div class="card card-body">
              <ul class="list-group">
                <li v-for="participant in pollResult.pollUser" :key="participant.publicName" class="list-group-item d-flex justify-content-between align-items-center">
                  {{ participant.publicName }}
                </li>
              </ul>
            </div>
          </div>
          <hr class="divider mx-2" />
          <p v-if="pollResult.type === 'PUBLIC'">{{ localize('view.results.detailResult') }}</p>
          <button v-if="pollResult.type === 'PUBLIC'" class="btn btn-primary" type="button" data-toggle="collapse" data-target="#poll-ID-ResultDetails"
                  aria-expanded="false" aria-controls="poll-ID-ResultDetails">
            <i class="bi bi-caret-right-fill"></i>
            {{ localize('view.results.showDetailResult') }}
          </button>
          <div class="collapse" id="poll-ID-ResultDetails" v-if="pollResult.type === 'PUBLIC'">
            <div class="card card-body">
              <ul class="list-group">
                <li  v-for="participantWithAnswer in pollResult.pollAnswer" :key="participantWithAnswer.publicName" class="list-group-item d-flex justify-content-between align-items-center">
                  {{ participantWithAnswer.publicName }} - {{ participantWithAnswer.content }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { localize } from '@/helper/localization-helper'

export default {
  props: {
    pollResult: {
      type: Object,
      required: true
    }
  },
  methods: {
    localize (path) {
      return localize(path)
    }
  }
}
</script>
