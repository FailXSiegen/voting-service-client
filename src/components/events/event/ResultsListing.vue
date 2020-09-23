<template>
  <div class="results-listing">
    <button type="button" class="btn btn-primary" data-toggle="modal" data-backdrop="static" data-keyboard="false"
            data-target="#examplePollResults">
      Zeige Vorschau einer Abstimmung
    </button>
    <div class="modal fade" id="examplePollResults" tabindex="-1" role="dialog"
         aria-labelledby="examplePollResultsTitle"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="examplePollResultsTitle">Ergebnisse von letzter Umfrage:</h5>
          </div>
          <div class="modal-body">
              <h5 class="mb-1">Titel der Abstimmung (offen)</h5>
              <p class="small text-muted">
                {{ localize('view.results.givenVotes') }} 52 | {{ localize('view.results.voters') }} 51
              </p>
              <hr class="divider my-2" />
              <p>{{ localize('view.results.mainResult') }}</p>
              <div class="result-list">
                <ul class="list-group">
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    {{ localize('general.yes') }}
                    <span class="badge badge-pill" style="background-color: green;color: white;">40</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    {{ localize('general.no') }}
                    <span class="badge badge-pill" style="background-color: red; color: white;">10</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    {{ localize('general.abstention') }}
                    <span class="badge badge-primary badge-pill" style="background-color: grey">2</span>
                  </li>
                </ul>
              </div>
            <hr class="divider mx-2" />
              <p>{{ localize('general.member') }}</p>
              <button class="btn btn-primary"
                      type="button"
                      data-toggle="collapse"
                      data-target="#modalpoll-ID-ResultVoters"
                      aria-expanded="false"
                      aria-controls="modalpoll-ID-ResultVoters">
                <i class="bi bi-caret-right-fill"></i>
                {{ localize('view.results.showMemberList') }}
              </button>
              <div class="collapse" id="modalpoll-ID-ResultVoters">
                <div class="card card-body">
                  <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      Felix Meyer
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      Superstar of Fistguitar
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      Lena Landrut
                    </li>
                  </ul>
                </div>
              </div>
              <hr class="divider mx-2" />
              <p>{{ localize('view.results.detailResult') }}</p>
              <button class="btn btn-primary" type="button" data-toggle="collapse"
                      data-target="#modalpoll-ID-ResultDetails"
                      aria-expanded="false" aria-controls="modalpoll-ID-ResultDetails">
                <i class="bi bi-caret-right-fill"></i>
                {{ localize('view.results.showDetailResult') }}
              </button>
              <div class="collapse" id="modalpoll-ID-ResultDetails">
                <div class="card card-body">
                  <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      Felix Meyer
                      <span class="badge badge-pill" style="background-color: green;color: white;">Ja</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      Felix Meyer
                      <span class="badge badge-pill" style="background-color: green;color: white;">Ja</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      Superstar of Fistguitar
                      <span class="badge badge-pill" style="background-color: grey;color: white;">Enthaltung</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      Lena Landrut
                      <span class="badge badge-pill" style="background-color: red;color: white;">Nein</span>
                    </li>
                  </ul>
                </div>
              </div>
          </div>
          <div class="modal-footer">
            <button data-dismiss="modal" class="btn btn-danger">Schließen</button>
          </div>
        </div>
      </div>
    </div>
    <h2>Vergangene Abstimmungen</h2>
    <ul class="created-polls list-group" v-if="pollResult">
      <app-result-row v-for="(pollResult, index) in pollResult" :key="index" :pollResult="pollResult"/>
    </ul>
  </div>
</template>

<style>
.modal-backdrop.show {
  opacity: .9 !important;
}
</style>

<script>

import { localize } from '@/helper/localization-helper'
import AppResultRow from '@/components/events/event/ResultRow'

export default {
  props: {
    eventRecord: {
      type: Object
    },
    pollResult: {
      type: Array
    }
  },
  created () {
    console.log(this.pollResult)
  },
  components: {
    AppResultRow
  },
  methods: {
    localize (path) {
      return localize(path)
    }
  }
}
</script>
