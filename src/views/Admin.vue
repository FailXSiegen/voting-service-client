<template>
  <div class="dashboard-container container-fluid">
    <div class="row">
      <div class="col-12 col-md-3 bg-dark text-white py-3">
        <app-navigation />
      </div>
      <div class="col-12 col-md-9 py-3">
        <h1>Herzlich willkommen Admin</h1>
        <h2>Du bist erfolgreich eingeloggt.</h2>
      </div>
    </div>
  </div>
</template>

<script>
import AppNavigation from '../components/Navigation'
export default {
  components: {
    AppNavigation
  }
}
</script>
