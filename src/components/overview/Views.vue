<template>
<div class="views-teaser row mx-0 my-5">
  <div v-for="(view, index) in views" :key="index" class="col-12 col-md-4 my-3">
    <div class="card p-3">
      <img class="m-auto" :src="view.icon" :alt="view.title" width="100">
      <div class="card-body">
        <router-link class="btn btn-primary btn-block" :to="view.route">{{ view.title }}</router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      views: this.$store.state.views
    }
  }
}
</script>
