<template>
  <div class="profile-container container-fluid">
    <div class="row">
      <div class="col-12 col-md-3 bg-dark text-white py-3">
        <app-navigation />
      </div>
      <div class="col-12 col-md-5 py-3">
        <h1>{{ headline }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import AppNavigation from '../../components/Navigation'

export default {
  components: {
    AppNavigation
  },
  data () {
    return {
      headline: 'Polls'
    }
  }
}
</script>
