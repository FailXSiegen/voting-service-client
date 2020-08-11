<template>
  <div class="events-listing-container my-5">
    <h2 v-if="headline" class="mb-3"> {{ headline }} </h2>
    <table class="table">
      <thead class="thead-light">
      <tr>
        <th scope="col">Event Name</th>
        <th scope="col">Created</th>
        <th scope="col">Finished</th>
        <th scope="col" v-if="eventsDetail">Actions</th>
      </tr>
      </thead>
      <tbody>

      <tr v-for="(event, index) in this.events" :key="index" class="table-event">
          <th scope="row">{{ event.title }}</th>
          <td>20.08.2020</td>
          <td>No</td>
          <td v-if="eventsDetail">
            <router-link to="/#" class="btn btn-primary mx-1 my-2">Edit</router-link>
            <router-link to="/#" class="btn btn-primary mx-1">Copy Invite Link</router-link>
            <router-link to="/#" class="btn btn-primary mx-1">Open in new Tab</router-link>
            <router-link to="/#" class="btn btn-primary mx-1">Close</router-link>
          </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    headline: {
      type: String
    },
    eventsDetail: {
      type: Boolean,
      required: true
    },
    events: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
  .table td, .table th {
    vertical-align: middle;
  }
</style>
