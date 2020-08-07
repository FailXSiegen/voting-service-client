<template>
  <header id="header" class="mb-5">
    <nav class="navbar navbar-dark bg-dark">
      <div class="headline text-center d-block d-md-none w-100 py-2">
        <h1 class="text-light">{{ headline }}</h1>
      </div>
      <router-link class="navbar-brand p-3" to="/overview">
        <img alt="Vue logo" src="../assets/logo.png" width="120">
      </router-link>
      <div class="headline text-center d-none d-md-block">
        <h1 class="text-light">{{ headline }}</h1>
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav aling-items-end justify-content-end mr-auto py-3">
          <router-link v-for="(view, index) in views" :key="index" class="nav-item text-light text-right my-2 h3" :to="view.route">{{ view.title }}</router-link>
          <div class="align-self-end w-50 dropdown-divider"></div>
          <router-link class="nav-item text-light text-right my-2 h3" to="/">Logout</router-link>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  props: {
    headline: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      views: this.$store.state.views
    }
  }
}
</script>
