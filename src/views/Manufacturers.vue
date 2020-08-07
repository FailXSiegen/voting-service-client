<template>
  <div class="manufacturers-container mb-5">
    <app-header :headline="headline"></app-header>
    <slot name="alerts"></slot>
    <div class="manufacturers-listing" v-show="!editView">
      <div class="row mx-0 justify-content-between align-items-end">
        <div class="col-auto">
          <app-manufacturer-filter @filter="onFilter"></app-manufacturer-filter>
        </div>
        <div class="col-auto">
          <app-insert-actions @import="onImport" @addNew="onEnableUpdateView"></app-insert-actions>
        </div>
      </div>
      <div v-if="pagination.recordCount > 0" class="row justify-content-center mx-0 mt-5">
        <div class="col-auto">
          <app-pagination :pagination="pagination"></app-pagination>
        </div>
      </div>
      <div class="row justify-content-center mx-0">
        <div class="col-auto">
          <div v-if="$apollo.queries.manufacturers.loading">Loading...</div>
          <app-manufacturers-listing :manufacturers="manufacturers" @edit="onEnableUpdateView" @delete="onDelete"></app-manufacturers-listing>
        </div>
      </div>
      <div v-if="pagination.recordCount > 0" class="row justify-content-center mx-0 mb-5">
        <div class="col-auto">
          <app-pagination :pagination="pagination"></app-pagination>
        </div>
      </div>
    </div>
    <div class="row mx-0 justify-content-center" v-if="editView">
      <div class="col-12 col-lg-8">
        <app-manufacturers-edit :manufacturer="selectedManufacturer" @submit="onUpdate"></app-manufacturers-edit>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from './../components/Header'
import AppManufacturerFilter from './../components/manufacturers/ManufacturerFilter'
import AppInsertActions from './../components/manufacturers/InsertActions'
import AppPagination from './../components/Pagination'
import AppManufacturersListing from './../components/manufacturers/Listing'
import AppManufacturersEdit from './../components/manufacturers/Edit'
import apollo from './../graphql/client/manufacturers'
import { buildUpdateManufacturerMutation, buildCreateManufacturerMutation, buildDeleteManufacturerMutation } from './../graphql/mutations'
import { addDangerMessage } from './../helper/alert-helper'

export default {
  components: {
    AppHeader,
    AppManufacturerFilter,
    AppInsertActions,
    AppPagination,
    AppManufacturersListing,
    AppManufacturersEdit
  },
  apollo,
  data () {
    return {
      headline: 'Manufacturers',
      pagination: {
        ...this.$store.state.pagination,
        recordCount: 0,
        currentPage: 1
      },
      manufacturers: [],
      editView: false,
      selectedManufacturer: null
    }
  },
  methods: {
    onImport () {
      // @TODO implement me!
      alert('import')
      // this.$apollo.queries.manufacturers.start()
    },
    onFilter (event) {
      // @TODO implement me!
      console.log(event.filter)
      alert('filter')
    },
    onEnableUpdateView (event) {
      this.selectedManufacturer = event.manufacturer
      this.editView = true
    },
    onDelete (event) {
      this.selectedManufacturer = null
      this.$apollo.mutate({
        mutation: buildDeleteManufacturerMutation(),
        variables: {
          id: event.manufacturer.id
        }
      }).then(() => {
        this.$apollo.queries.manufacturers.refetch()
        this.$apollo.queries.manufacturersCount.refetch()
      }).catch(() => {
        addDangerMessage('Fehler!', 'Hersteller konnte nicht entfernt werden.')
      })
    },
    onUpdate () {
      if (this.selectedManufacturer.id) {
        delete this.selectedManufacturer.__typename
        this.$apollo.mutate({
          mutation: buildUpdateManufacturerMutation(),
          variables: {
            input: this.selectedManufacturer
          }
        }).then(() => {
          this.$apollo.queries.manufacturers.refetch()
          this.$apollo.queries.manufacturersCount.refetch()
        })
      } else {
        delete this.selectedManufacturer.__typename
        this.$apollo.mutate({
          mutation: buildCreateManufacturerMutation(),
          variables: {
            input: this.selectedManufacturer
          }
        }).then(() => {
          this.$apollo.queries.manufacturers.refetch()
          this.$apollo.queries.manufacturersCount.refetch()
        })
      }
      this.editView = false
      this.selectedManufacturer = null
    }
  }
}
</script>
